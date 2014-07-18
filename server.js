var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socketio_jwt = require('socketio-jwt');
var path = require('path');
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
var jwt_secret = 'cats';
var leftPlayer;
var rightPlayer;

//////////////////// //////////////////// ////////////////////
//////////////////// SOCKET COMMUNICATION ////////////////////
//////////////////// //////////////////// ////////////////////

io.use(socketio_jwt.authorize({
	secret: jwt_secret,
	handshake: true
}));

io.on('connection', function (socket) {
	var id = socket.decoded_token.code;
	console.log(id);
	if(id != 'host'){
		io.emit('player connected', id);	
	}

	socket.on('player codes', function (players) {
		// console.log(players);
		leftPlayer = players.leftPlayer;
		rightPlayer = players.rightPlayer;

		// socket.emit()

	});

	socket.on('positions', function (p) {
		io.emit('client position data', p);
	});

	socket.on('collision', function (contact) {
		io.emit('contact', contact)
	});

	socket.on('disconnect', function () {
		io.emit('player disconnected', id);
		console.log(id, 'disconnected');
	});
});

//////////////////// //////////////////// ////////////////////
//////////////////// HERE IS THE EXPRESS APP /////////////////
//////////////////// //////////////////// ////////////////////

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/client', function (req, res) {
	res.sendfile('client.html')
})

app.get('/host', function (req, res) {
	res.sendfile('index.html');
});

app.post('/login', function (req, res) {
	var login = {
		code: req.body.code 
	};

	if(login.code === 'host' || login.code === leftPlayer || login.code === rightPlayer){

		// We are sending the login inside the token
		var token = jwt.sign(login, jwt_secret, { expiresInMinutes: 60*5 });

		res.json({token: token});
	}

});


http.listen(3000, function(){
	console.log('listening on *:3000');
});

// identify what is connecting via socket.io: player, board, camera --> each of these will go to a different controller
// 1. if player, only sending through flip or not flip (ons and offs), latency. player sends back, ball + velocity + vector direction of entry
// 2. if camera, array of obstacles: an obstacle has a radius + center pos + type (cans, bottles, shot glasses)
// 3. board takes input from camera + player 