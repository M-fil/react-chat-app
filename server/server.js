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
    setTimeout(() => {
      socket.connect();
    }, 1000);
  });

  socket.on('sendMessage', (message) => {
    console.log('message', message);
    io.sockets.emit('message', message);
  });

  socket.on('conversationCreate', (conversationId) => {
    console.log('conversationId', conversationId)
    socket.join(conversationId);
    io.sockets.emit('adminJoin', conversationId);
    // io.in(conversationId).emit('adminJoin', conversationId);
  });

  socket.on('error', (error) => {
    console.log('error', error)
  })

  socket.on('connect_error', (err) => {
    console.log(err.message);
    socket.offAny();
    setTimeout(() => {
      socket.connect();
    }, 1000);
  });
});

server.listen(PORT, () => {
  console.log(`The server has started on the ${PORT} port...`);
});
