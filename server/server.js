require('./firebase');
const http = require('http');
const socketio = require('socket.io');
const { createMessageInDB } = require('./services/chat');

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

  socket.on('message', (message, receiverId) => {
    createMessageInDB(receiverId,  message);
  });

  socket.on('sendMessage', (receiverId, message, isForAllClient) => {
    console.log('receiverId', receiverId)
    if (isForAllClient) {
      io.to(receiverId).emit('message', message, receiverId);
    } else {
      socket.to(receiverId).emit('message', message, receiverId);
    }

    createMessageInDB(receiverId,  message);
  });

  socket.on('joinPrivateChat', (chatId) => {
    socket.join(chatId);
  });

  socket.on('joinConversation', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('leaveChat', (chatId) => {
    console.log('LEAVE CHAT', chatId);
    socket.leave(chatId);
  })

  socket.on('chatCreate', (userId) => {
    const isIdExists = socket.rooms.has(userId);
    if (!isIdExists) {
      socket.join(userId);
    }
  });

  socket.on('conversationCreate', (conversationId) => {
    console.log('conversationId', conversationId);
    socket.join(conversationId);
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
