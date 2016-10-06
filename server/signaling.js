module.exports.createSignalingChannel = io => {
  io.on('connection', socket => {
    socket.on('join_room', (roomName, respond) => {
      const numClients = io.sockets.clients(roomName).length;
      if (numClients < 2) {
        socket.join(roomName);
        respond(numClients + 1);
      } else {
        respond('full');
      }
    });

    socket.on('remote_candidate', info => {
      const { roomName, candidate } = info;
      socket.to(roomName).emit('remote_candidate', candidate);
    });
  });
}
