module.exports.createSignalingChannel = (io) => {
  io.on('connection', (socket) => {
    socket.on('join_room', (roomName, respond) => {
      console.log('user has joined room:', roomName);
      const numClients = io.sockets.adapter.rooms[roomName] ?
                         io.sockets.adapter.rooms[roomName].length : 0;
      if (numClients < 2) {
        socket.join(roomName);
        // socket.emit('joined_room', roomName);
        respond(numClients + 1);
      } else {
        socket.emit('room_full', roomName);
        respond('full');
      }
    });

    socket.on('remote_candidate', (info) => {
      const { roomName, candidate } = info;
      socket.to(roomName).emit('remote_candidate', candidate);
    });

    socket.on('offer', (sessionDesc, roomName) => {
      console.log('offer attempt at room:', roomName, 'and session:', sessionDesc);
      socket.broadcast.to(roomName).emit('offer', sessionDesc);
    });

    socket.on('answer', (sessionDesc, roomName) => {
      console.log('answer attempt at room:', roomName, 'and session:', sessionDesc);
      socket.broadcast.to(roomName).emit('answer', sessionDesc);
    });
  });
};

