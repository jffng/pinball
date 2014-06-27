var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var pinball = io;
var camera = io;

pinball.on('connection', function(socket){
  console.log('a user connected');
  socket.on('hit can', function(){
  	console.log('it hit the can');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// identify what is connecting via socket.io: player, board, camera --> each of these will go to a different controller
// 1. if player, only sending through flip or not flip (ons and offs), latency. player sends back, ball + velocity + vector direction of entry
// 2. if camera, array of obstacles: an obstacle has a radius + center pos + type (cans, bottles, shot glasses)
// 3. board takes input from camera + player 