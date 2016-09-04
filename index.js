var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html' , { root : __dirname});
});

io.on('connection', function(socket){
  socket.broadcast.emit('chat message', 'user joined the room');
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    socket.broadcast.emit('chat message', 'user left the room');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
