import { coldBrewRTC } from 'cold-brew-rtc';

export default {
  isInitiator: false,

  createConnection(socket, roomName) {
    console.log('creating connection');
    const servers = null; // Change later?

    const peerConnection = coldBrewRTC(
      servers,
      { optional: [{ RtcDataChannels: true }] }
    );

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('local ice candidate discovered, event.candidate:', event.candidate);
        socket.emit('remote_candidate', {
          roomName,
          candidate: JSON.stringify(event.candidate),
        });
      }
    };

    return peerConnection;
  },

  /**
   * acceptRemoteICECandidates - This function will
   * be invoked immediately after creating the RTCPeerConnection
   * object with the createConnection function, above
   *
   * @param  {socket} socket
   * @param  {RTCPeerConnection} peerConnection
   */
  acceptRemoteICECandidates(socket, peerConnection) {
    socket.on('remote_candidate', (candidate) => {
      console.log('received remote ice candidate:', candidate);
      const candidateObj = JSON.parse(candidate);
      peerConnection.addIceCandidate(candidateObj);
    });
  },

  createOffer(socket, peerConnection, roomName) {
    return new Promise((resolve, reject) => {
      peerConnection.createOffer(
        (sessionDescription) => {
          console.log('created offer with sessionDesc', sessionDescription);
          peerConnection.setLocalDescription(sessionDescription);
          socket.emit('offer', sessionDescription, roomName);
          resolve(sessionDescription);
        }, (error) => {
        reject(error);
      });

      socket.on('answer', (sessionDescription) => {
        console.log('received answer of:', sessionDescription);
        this.acceptRemoteAnswer(sessionDescription, peerConnection);
      });
    });
  },

  listenForRemoteOffer(socket, peerConnection, roomName) {
    socket.on('offer', (sessionDescription) => {
      console.log('received remote offer');
      peerConnection.setRemoteDescription(sessionDescription);
      this.createAnswer(socket, peerConnection, roomName);
    });
  },

  createAnswer(socket, peerConnection, roomName) {
    return new Promise((resolve, reject) => {
      peerConnection.createAnswer(
        (sessionDescription) => {
          console.log('created answer');
          peerConnection.setLocalDescription(sessionDescription);
          socket.emit('answer', sessionDescription, roomName);
          resolve(sessionDescription);
        }, error => reject(error)
      );
    });
  },

  acceptRemoteAnswer(sessionDescription, peerConnection) {
    peerConnection.setRemoteDescription(sessionDescription);
  },

  createDataChannel(peerConnection) {
    try {
      const sendChannel = peerConnection.createDataChannel(
        'sendDataChannel',
        { reliable: false }
      );
      // Do we need sendchannel.onopen
      // and sendChannel.onclose handlers
      console.log('created data channel');
      return sendChannel;
    } catch (e) {
      console.log('Failed to create data channel', e);
      return null;
    }
  },
  // In room View
  // might need to hold on to variables in closed over environment
  // due to garbage collection
  // peerConnection.ondatachannel = event => {
  //   const receivedChannel = event.channel;
  //   receivedChannel.onmessage = messageEvent => {
  //     const message = messageEvent.data;
  //     //do stuff with message
  //   }
  // }
};
