import React from 'react';
import ChatContainer from './Chat/ChatContainer';
import CanvasContainer from './Canvas/CanvasContainer';
import VideoContainer from './Video/VideoContainer';
import RTC from './../../rtc-controller.js';

import store from '../../store';
import socket from '../../socket';

export default class RoomView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: null,
      messages: ['default'],
    };
  }

  componentDidMount() {
    const roomName = store.getState().get('room').get('name');
    const peerConnection = RTC.createConnection(socket, roomName);
    RTC.acceptRemoteICECandidates(socket, peerConnection);

    if (RTC.isInitiator === true) {
      console.log('You are the Initiator!');
      const sendChannel = RTC.createDataChannel(peerConnection);
      RTC.createOffer(socket, peerConnection, roomName);
      sendChannel.onopen = () => {
        console.log('data channel open');
        sendChannel.onmessage = (message) => {
          console.log(message.data);
          const temp = this.state;
          temp.messages.push(message);
          this.setState(temp);
        };
        this.setState({ channel: sendChannel });
      };
    } else {
      RTC.listenForRemoteOffer(socket, peerConnection, roomName);
      peerConnection.ondatachannel = (event) => {
        console.log('data channel opened, event:', event);
        const dataChannel = event.channel;
        dataChannel.onmessage = (message) => {
          console.log(message.data);
          const temp = this.state;
          temp.messages.push(message);
          this.setState(temp);
        };
        this.setState({ channel: dataChannel });
      };
    }
  }

  render() {
    return (
      <div>
        <p>You are in room {store.getState().get('room').get('name')}</p>
        <CanvasContainer />

        <ChatContainer
          sendMessage={this.sendMessage.bind(this)}
        />

        <VideoContainer />
        <button onClick={() => this.sendMessage('hello')}>Click here!</button>
      </div>
    );
  }
}
