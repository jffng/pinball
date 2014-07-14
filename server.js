var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketio_jwt = require('socketio-jwt');
var path = require('path');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var jwt_secret = 'cats';

var CLIENTS = [];

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.post('/login', function (req, res) {
	var login = {
		code: req.body.code 
	};

	if(login.code === 'aaa'){
		// We are sending the login inside the token
		var token = jwt.sign(login, jwt_secret, { expiresInMinutes: 60*5 });

		res.json({token: token});
	}
});

io.use(socketio_jwt.authorize({
	secret: jwt_secret,
	handshake: true
}));

io.sockets.on('connection', function (socket) {
	var id = socket.decoded_token.code;
	console.log(id, 'connected');

	if(id === 'pinball table client') return;
	
	socket.emit('add player', { id: id });
	
	socket.on('ping', function (m) {
		socket.emit('pong', m);
	});
});

// setInterval(function () {
//   io.sockets.emit('time', Date());
// }, 5000);

app.get('/host', function (req, res) {
	var login = {
		code: 'pinball table client' 
	};

	var token = jwt.sign(login, jwt_secret, { expiresInMinutes: 60*5 });

	// res.json({token: token});
	res.sendfile('index.html');
});

app.get('/client', function (req, res) {
	res.sendfile('client.html')
})

// io.on('connection', function (socket) {
// 	console.log('a user connected');
// 	CLIENTS.push(socket);
// 	console.log(CLIENTS);
// 	// socket.emit('new player', CLIENTS);
// });

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
// }
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