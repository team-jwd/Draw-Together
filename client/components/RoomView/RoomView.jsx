import React from 'react';
import { connect } from 'react-redux';
import ChatContainer from './Chat/ChatContainer';
import CanvasContainer from './Canvas/CanvasContainer';
import VideoContainer from './Video/VideoContainer';
import RTC from './../../rtc-controller.js';

import store from '../../store';
import actions from '../../actions';
import socket from '../../socket';

class RoomView extends React.Component {
  constructor(props) {
    super(props);

    this.onChatMessageSubmit = this.onChatMessageSubmit.bind(this);

    this.startDraw = this.startDraw.bind(this);
    this.newDraw = this.newDraw.bind(this);
    this.endDraw = this.endDraw.bind(this);

    this.strokeChanged = this.strokeChanged.bind(this);
    this.widthChanged = this.widthChanged.bind(this);
    this.drawTypeChanged = this.drawTypeChanged.bind(this);

    this.state = {
      peerConnection: null,
      channel: null,
      canvas: null,
      ctx: null,
      rect: null,
      prevX: null,
      prevY: null,
      mouseDown: false,
      strokeStyle: 'black',
      lineWidth: '5',
      drawType: 'draw',
    };
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      if (!store.getState().get('room')) {
        this.props.history.push('/dashboard');
      }
    } else {
      store.dispatch(actions.logout());
      this.props.history.push('/');
    }
  }


  componentDidMount() {
    const canvas = document.getElementById('canvass');
    const ctx = canvas.getContext('2d');
    this.setState({
      canvas,
      ctx,
    });

    // RTC stuff
    const roomName = this.props.roomName;

    const peerConnection = RTC.createConnection(socket, roomName);
    RTC.acceptRemoteICECandidates(socket, peerConnection);

    if (RTC.isInitiator) {
      this.initiateRTC(peerConnection, roomName);
      console.log('You are the initiator!');
    } else {
      this.listenForRTC(peerConnection, roomName);
    }
    //document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
  }

  componentDidUpdate() {
    document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
  }

  onChatMessageSubmit(text) {
    const username = store.getState().getIn(['userData', 'username']);
    store.dispatch(actions.addMessage(username, text));
    this.sendMessage(username, text);
  }

  initiateRTC(peerConnection, roomName) {
    const sendChannel = RTC.createDataChannel(peerConnection);
    RTC.createOffer(socket, peerConnection, roomName);

    sendChannel.onopen = () => {
      sendChannel.onmessage = (message) => {
        this.handleRTCData(message);
      };

      this.setState({ channel: sendChannel });
      console.log('sendchannel state set');
    };

    this.setState({ peerConnection });
  }


  listenForRTC(peerConnection, roomName) {
    RTC.listenForRemoteOffer(socket, peerConnection, roomName);

    peerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;
      dataChannel.onmessage = (message) => {
        this.handleRTCData(message);
      };

      this.setState({ channel: dataChannel });
      console.log('datachannel state set');
    };

    this.setState({ peerConnection });
  }

  handleRTCData(message) {
    const msgObj = JSON.parse(message.data);
    // Check for type
    if (msgObj.type === 'message') {
      store.dispatch(actions.addMessage(msgObj.username, msgObj.message));
    } else if (msgObj.type === 'canvas') {
      if (msgObj.drawType !== 'erase') {
        this.drawOnCanvas(msgObj.prevX, msgObj.prevY, msgObj.x, msgObj.y, msgObj.strokeStyle, msgObj.lineWidth);
      } else {
        this.erase(msgObj.prevX, msgObj.prevY, msgObj.x, msgObj.y, msgObj.lineWidth);
      }
    }
  }

  sendMessage(username, message) {
    // Only strings can be sent through the data channel
    const msgObj = { type: 'message', username, message };
    document.getElementById('textSubmit').value = '';
    this.state.channel.send(JSON.stringify(msgObj));
  }

  sendDrawData(drawData) {
    this.state.channel.send(JSON.stringify(drawData));
  }

  startDraw(e) {
    const rect = this.state.canvas.getBoundingClientRect();
    const prevX = e.pageX - rect.left - document.body.scrollLeft;
    const prevY = e.pageY - rect.top - document.body.scrollTop;
    const ctx = this.state.ctx;

    if (this.props.drawType === 'erase') {
      this.erase(prevX, prevY, prevX, prevY, ctx.lineWidth);
    } else {
      this.drawOnCanvas(prevX, prevY, prevX, prevY, ctx.strokeStyle, ctx.lineWidth);
    }
    this.setState({
      rect,
      prevX,
      prevY,
      mouseDown: true,
    });
  }

  newDraw(e) {
    if (this.state.mouseDown) {
      const x = e.pageX - this.state.rect.left - document.body.scrollLeft;
      const y = e.pageY - this.state.rect.top - document.body.scrollTop;

      // send relevant state info to connected clients in the room
      const drawState = {
        type: 'canvas',
        drawType: this.state.drawType,
        prevX: this.state.prevX,
        prevY: this.state.prevY,
        x,
        y,
        strokeStyle: this.state.strokeStyle,
        lineWidth: this.state.lineWidth,
      };

      if (this.state.channel) this.sendDrawData(drawState);

      if (this.state.drawType === 'erase') {
        this.erase(this.state.prevX, this.state.prevY, x, y);
      } else {
        this.drawOnCanvas(this.state.prevX, this.state.prevY, x, y);
      }
      this.setState({
        prevX: x,
        prevY: y,
      });
    }
  }

  drawOnCanvas(pX, pY, cX, cY, sS, lW) {
    const ctx = this.state.ctx;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = sS || this.state.strokeStyle;
    ctx.lineWidth = lW || this.state.lineWidth;
    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(cX, cY);
    ctx.stroke();
  }

  erase(pX, pY, cX, cY, lW) {
    const ctx = this.state.ctx;
    ctx.strokeStyle = 'white';
    ctx.lineWidth = lW || this.state.lineWidth;
    ctx.beginPath();
    ctx.moveTo(pX, pY);
    ctx.lineTo(cX, cY);
    ctx.stroke();
  }

  endDraw() {
    this.setState({
      mouseDown: false,
    });
  }

  strokeChanged(e) {
    this.setState({
      strokeStyle: e.target.value,
    });
  }

  widthChanged(e) {
    this.setState({
      lineWidth: e.target.value,
    });
  }

  drawTypeChanged(e) {
    this.setState({
      drawType: e.target.value,
    });
  }

  render() {
    return (
      <main className="room-view">
        <div id="room-banner">
          <h1>Boardroom</h1>
          <h2>You are in room {store.getState().get('room').get('name') }</h2>
        </div>
        <div id="room">

          <CanvasContainer
            strokeStyle={this.state.strokeStyle}
            lineWidth={this.state.lineWidth}
            drawType={this.state.drawType}

            startDraw={this.startDraw}
            newDraw={this.newDraw}
            endDraw={this.endDraw}

            strokeChanged={this.strokeChanged}
            widthChanged={this.widthChanged}
            drawTypeChanged={this.drawTypeChanged}
          />

          <div id="chat-video">
            <ChatContainer
              messages={this.props.messages}
              onChatMessageSubmit={this.onChatMessageSubmit}
            />
            <VideoContainer />
          </div>
        </div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.getIn(['room', 'messages']),
    roomName: state.getIn(['room', 'name']),
  };
}

export default connect(mapStateToProps)(RoomView);
