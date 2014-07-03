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

// create the b2 world
var worldAABB = new Box2D.b2AABB();
worldAABB.lowerBound.Set(-100.0, -100.0);
worldAABB.upperBound.Set(100.0, 100.0);

world = new Box2D.b2World( worldAABB, new Box2D.b2Vec2(-1, 10), true );

var	Level = require('phys/level'),
	Controller = require('phys/controller');

// instantiate a new level of static components
level = new Level("test");
controller = new Controller();

// Run Simulation!
	// for (var i=0; i < 60; i++) {
	// 	world.Step(
	// 		1 / 60   //frame-rate
	// 		,  10       //velocity iterations
	// 		,  10       //position iterations
	// 	);
	// }

io.on('connection', function (socket) {
	
		console.log('a user connected');
		socket.emit('world', world);
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

http.listen(3000, function(){
	console.log('listening on *:3000');
});

// identify what is connecting via socket.io: player, board, camera --> each of these will go to a different controller
// 1. if player, only sending through flip or not flip (ons and offs), latency. player sends back, ball + velocity + vector direction of entry
// 2. if camera, array of obstacles: an obstacle has a radius + center pos + type (cans, bottles, shot glasses)
// 3. board takes input from camera + player 