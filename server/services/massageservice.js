const socketIo = require('socket.io');

let io;

// Initialize Socket.io
const initSocket = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('New user connected');

    // Join room for one-to-one messaging
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Handle message sent by a user
    socket.on('sendMessage', (messageData) => {
      const { roomId, message, sender } = messageData;
      io.to(roomId).emit('receiveMessage', { message, sender });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

module.exports = { initSocket };
