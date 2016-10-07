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
    this.state = {
      peerConnection: null,
      channel: null,
    };
  }


  componentDidMount() {
    console.log(this.props.messages);
    const roomName = store.getState().get('room').get('name');

    const peerConnection = RTC.createConnection(socket, roomName);
    RTC.acceptRemoteICECandidates(socket, peerConnection);

    RTC.isInitiator ?
      this.initiateRTC(socket, peerConnection, roomName) :
      this.listenForRTC(socket, peerConnection, roomName);
  }


  initiateRTC(socket, peerConnection, roomName) {
    const sendChannel = RTC.createDataChannel(peerConnection);
    RTC.createOffer(socket, peerConnection, roomName);

    sendChannel.onopen = () => {
      sendChannel.onmessage = (message) => {
        console.log(message);
      }

      this.setState({ channel: sendChannel });
    };

    this.setState({ peerConnection: peerConnection });
  }


  listenForRTC(socket, peerConnection, roomName) {
    RTC.listenForRemoteOffer(socket, peerConnection, roomName);

    peerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;
      dataChannel.onmessage = (message) => {
        console.log(message);
      };

      this.setState({ channel: dataChannel });
    };

    this.setState({ peerConnection: peerConnection });
  }


  sendMessage(message) {
    // Only strings can be sent through the data channel
    this.state.channel.send(JSON.stringify(message));
  }


  onChatMessageSubmit(text) {
    const username = store.getState().getIn(['userData', 'username']);
    console.log(username, text);

    store.dispatch(actions.addMessage(username, text));
    console.log(store.getState().getIn(['room', 'messages']));
  }


  render() {
    return (
      <div>
        <CanvasContainer />
        <ChatContainer
          onChatMessageSubmit={this.onChatMessageSubmit.bind(this)}
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
  }
}

export default connect(mapStateToProps)(RoomView);
