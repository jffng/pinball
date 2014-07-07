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

// Box2D global variables
var positions;
var fps = 60;

function init () {
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

	interval = setInterval(function () { 
		update();
	},1000/fps);

	update();
};

// Run Simulation!
function update () {
	world.Step(
		1 / 60   //frame-rate
		,  10       //velocity iterations
		,  10       //position iterations
	);

	io.emit( 'world', getPositions() );

	world.ClearForces();
};

function getPositions () {
	var bodies = [];

	for(var bb = world.GetBodyList(); bb; bb = bb.GetNext()) {
		// get the root position of our body
		var bodyPos = bb.GetPosition();

		// if we haven't created a sprite for this body yet
		if(bb.m_userData == null) {

			// loop through all our fixtures;
			for(var bf = bb.GetFixtureList(); bf; bf = bf.GetNext()) {
				var shape = bf.GetShape();
				if(shape.GetType() == 1) {
					var verts = shape.GetVertices();
					bodies.push(verts);
				} else if(shape.GetType() == 0) {
					var circ = {
						"pos": shape.GetLocalPosition(),
						"radius": shape.GetRadius()
					};
					bodies.push(circ);
				}
			}
		} 
		//  else if(bb.m_userData !== "image") {
		// 	var s = bb.m_userData;
		// 	s.position.x = bodyPos.x * drawScale;
		// 	s.position.y = bodyPos.y * -drawScale;
		// 	s.rotation = -bb.GetAngle();			
		// }
	}
	return bodies;
};

io.on('connection', function (socket) {
	console.log('a user connected');
	// socket.on('request', function () {
	// });
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

init();

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