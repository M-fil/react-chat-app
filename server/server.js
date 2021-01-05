const http = require('http');
const socketio = require('socket.io');

const server = http.createServer();
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  }
});
const PORT = 3030 || process.env.PORT;

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('You were disconnected by the socket.io...');
  });

  socket.on('sendMessage', (receiverId, message, isChannel) => {
    console.log('receiverId', receiverId)
    socket.to(receiverId).emit('message', message, isChannel);
  });

  socket.on('chatCreate', (userId) => {
    const isIdExists = socket.rooms.has(userId);
    if (!isIdExists) {
      console.log('chatCreate', userId)
      socket.join(userId);
    }
  });

  socket.on('conversationCreate', (conversationId) => {
    console.log('conversationId', conversationId)
    socket.join(conversationId);
    io.emit('adminJoin', conversationId);
  });

  socket.on('error', (error) => {
    console.log('error', error)
  })

  socket.on('connect_error', (err) => {
    console.log(err.message);
    socket.offAny();
  });
});

server.listen(PORT, () => {
  console.log(`The server has started on the ${PORT} port...`);
});
