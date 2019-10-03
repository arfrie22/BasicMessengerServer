'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('join', function(usr){
    console.log('join: ' + usr);
    io.emit('join', usr);
  });
  
  socket.on('disconnect', function(usr){
    console.log('disconnect: ' + usr);
    io.emit('disconnect', usr);
  });
  
  socket.on('message', function(msg){
    console.log('message: ' + msg);
    io.emit('message', msg);
  });
  
  socket.on('leave', function(usr){
    console.log('leave: ' + usr);
    io.emit('leave', usr);
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
