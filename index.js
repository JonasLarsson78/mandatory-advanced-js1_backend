const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3010;
const INDEX = '/index.html';

const server = express()
  .use(cors())
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    console.log(message);
    const id = uuidv4();
    const date = new Date();
    const newMessage = { ...message, id, date };
    io.sockets.emit('new_message', newMessage);
  });
  console.log('New User connected');
});
