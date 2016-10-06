

export default {
  isInitiator: false,

  createConnection(socket, roomName) {
    const servers = null; // Change later?

    const peerConnection = new RTCPeerConnection(
      servers,
      { optional: [{ RtcDataChannels: true }] }
    );

    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('remote_candidate', {
          roomName,
          candidate: JSON.stringify(event.candidate)
        });
      }
    }

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
    socket.on('remote_candidate', candidate => {
      candidate = JSON.parse(candidate);
      peerConnection.addIceCandidate(candidate);
    });
  },

  createDataChannel(peerConnection) {
    try {
      const sendChannel = peerConnection.createDataChannel(
        'sendDataChannel',
        { reliable: false }
      );
      // Do we need sendchannel.onopen
      // and sendChannel.onclose handlers
      return sendChannel;
    } catch (e) {
      console.log('Failed to create data channel', e);
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

}
