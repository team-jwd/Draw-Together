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
    } else {
      this.listenForRTC(peerConnection, roomName);
    }
  }

  onChatMessageSubmit(text) {
    const username = store.getState().getIn(['userData', 'username']);
    store.dispatch(actions.addMessage(username, text));
  }

  initiateRTC(peerConnection, roomName) {
    const sendChannel = RTC.createDataChannel(peerConnection);
    RTC.createOffer(socket, peerConnection, roomName);

    sendChannel.onopen = () => {
      sendChannel.onmessage = (message) => {
        console.log(message);
      };

      this.setState({ channel: sendChannel });
    };

    this.setState({ peerConnection });
  }


  listenForRTC(peerConnection, roomName) {
    RTC.listenForRemoteOffer(socket, peerConnection, roomName);

    peerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;
      dataChannel.onmessage = (message) => {
        console.log(message);
      };

      this.setState({ channel: dataChannel });
    };

    this.setState({ peerConnection });
  }


  sendMessage(message) {
    // Only strings can be sent through the data channel
    this.state.channel.send(JSON.stringify(message));
  }

  render() {
    return (
      <div>
        <p>You are in room {store.getState().get('room').get('name')}</p>
        <CanvasContainer />

        <ChatContainer
          messages={this.props.messages}
          onChatMessageSubmit={this.onChatMessageSubmit}
        />

        <VideoContainer />
        <button onClick={() => this.sendMessage('hello')}>Click here!</button>
      </div>
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
