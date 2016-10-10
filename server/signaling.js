module.exports.createSignalingChannel = (io) => {
  io.on('connection', (socket) => {
    socket.on('join_room', (roomName, respond) => {
      const numClients = io.sockets.adapter.rooms[roomName] ?
                         io.sockets.adapter.rooms[roomName].length : 0;
      if (numClients < 2) {
        socket.join(roomName);
        respond(numClients + 1);
      } else {
        socket.emit('room_full', roomName);
        respond('full');
      }
    });

    socket.on('create_room', (roomName, respond) => {
      if (io.sockets.adapter.rooms[roomName]) {
        respond('exists');
      } else {
        socket.join(roomName);
        // socket.emit('joined_room', roomName);
        respond('created');
      }
    });

    socket.on('remote_candidate', (info) => {
      const { roomName, candidate } = info;
      socket.to(roomName).emit('remote_candidate', candidate);
    });

    socket.on('offer', (sessionDesc, roomName) => {
      socket.broadcast.to(roomName).emit('offer', sessionDesc);
    });

    socket.on('answer', (sessionDesc, roomName) => {
      socket.broadcast.to(roomName).emit('answer', sessionDesc);
    });
  });
};

