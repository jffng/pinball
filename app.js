var express = require('express');
var app = express();
var path = require('path');
var Box2D = require('box2dweb-commonjs');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendfile('index.html');
});

io.on('connection', function (socket) {
	console.log('a user connected');
	// socket.on('request', function () {
	// });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


// var player = io;
// var camera = io;
// var board = io;

// player.on('connection', function(socket){

// 	console.log('a player connected');

// 	// player receives a ball from the board
// 	socket.on('ball in', function(data){
// 		console.log(data);
// 	});

// 	// player sends a message about the time of contact 
// 	socket.on('contact', function (data) {
// 		console.log(data);
// 	});

// });

// camera.on('connection', function (socket) {
// 	console.log('a camera connected');

// 	// camera sends array of obstacles to the board
// 	socket.emit('obstacles', function (data) {
		
// 	});
// });

// board.on('connection', function (argument) {
// 	console.log('a board connected');

// 	socket.on('ball out', function (argument) {
// 		socket.emit('')
// 	});

// 	socket.on('')
// });

// identify what is connecting via socket.io: player, board, camera --> each of these will go to a different controller
// 1. if player, only sending through flip or not flip (ons and offs), latency. player sends back, ball + velocity + vector direction of entry
// 2. if camera, array of obstacles: an obstacle has a radius + center pos + type (cans, bottles, shot glasses)
// 3. board takes input from camera + player 