var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('index.html' , { root : __dirname});
});

io.on('connection', function(socket){
  var joined_message = {
    type: 'system-message',
    text: 'user joined the room',
  }
  socket.broadcast.emit('chat message', joined_message);

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
    var left_message = {
      type: 'system-message',
      text: 'user left the room',
    }
    socket.broadcast.emit('chat message', left_message);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
