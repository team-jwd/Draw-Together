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
    this.sendDrawData = this.sendDrawData.bind(this);

    this.state = {
      peerConnection: null,
      channel: null,
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
    const roomName = this.props.roomName;

    const peerConnection = RTC.createConnection(socket, roomName);
    RTC.acceptRemoteICECandidates(socket, peerConnection);

    if (RTC.isInitiator) {
      this.initiateRTC(peerConnection, roomName);
      console.log('You are the initiator!');
    } else {
      this.listenForRTC(peerConnection, roomName);
    }
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
        // Do something when we receive a message
        const msgObj = JSON.parse(message.data);
        store.dispatch(actions.addMessage(msgObj.username, msgObj.message));
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
        // Check for type
        if (message.data.type === 'message') {
          const msgObj = JSON.parse(message.data);
          store.dispatch(actions.addMessage(msgObj.username, msgObj.message));
        } else if (message.data.type === 'canvas') {
          // do something!
        }
      };

      this.setState({ channel: dataChannel });
      console.log('datachannel state set');
    };

    this.setState({ peerConnection });
  }

  sendMessage(username, message) {
    // Only strings can be sent through the data channel
    const msgObj = { type: 'message', username, message };
    this.state.channel.send(JSON.stringify(msgObj));
  }

  sendDrawData(drawData) {
    const send = this.state.channel.send;
    send(JSON.stringify(drawData));
  }

  render() {
    return (
      <main className="room-view">
        <div id="room-banner">
          <h1>Boardroom</h1>
          <h2>You are in room {store.getState().get('room').get('name') }</h2>
        </div>
        <div id="room">
          <CanvasContainer />
          <ChatContainer
            messages={this.props.messages}
            onChatMessageSubmit={this.onChatMessageSubmit}
          />
          <VideoContainer />
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
