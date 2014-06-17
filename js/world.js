$(function () {
	init();
});

var SCALE = 30;
var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

var world;
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2MassData = Box2D.Collision.Shapes.b2MassData;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;	
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var input = false;

function init () {
	var obstacles = [],
		pinballs = [];

	document.getElementById('c').width = CANVAS_WIDTH;
	document.getElementById('c').height = CANVAS_HEIGHT;	

	world = new b2World( new b2Vec2(0, 0), true );
	var walls = new Wall(boundaries);

	rightFlipperTest = new Flipper(20, 20, "right", "bottom");
	leftFlipperTest = new Flipper(20, 20, "left", "bottom");

	$(window).on('click', function(e){
		// obstacles.push(new Can( e.clientX / SCALE, e.clientY / SCALE, undefined ));
		pinballs.push(new Pinball(e.clientX / SCALE, e.clientY / SCALE + 0.5 ));			
	});

	$(window).on('keypress', function(e){
		console.log(e.keyCode);
		if(e.keyCode === 100) rightFlipperTest.sawBody.ApplyTorque(100000); 
		if(e.keyCode === 97) leftFlipperTest.sawBody.ApplyTorque(-100000);
	});

	$(window).on('keyup', function(e){
		// console.log(e.keyCode);
		if(e.keyCode === 68) rightFlipperTest.sawBody.ApplyTorque(-100000);
		if(e.keyCode === 65) leftFlipperTest.sawBody.ApplyTorque(100000);
		input = false;
	});

	requestAnimFrame(update);

	// Box2D debug simulation
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	$(window).resize( function () {
		CANVAS_WIDTH = window.innerWidth;
		CANVAS_HEIGHT = window.innerHeight;
		document.getElementById('c').width = CANVAS_WIDTH;
		document.getElementById('c').height = CANVAS_HEIGHT;		
	})
}

function update() {
	world.Step(
		1 / 60   //frame-rate
		,  10       //velocity iterations
		,  10       //position iterations
	);
	world.DrawDebugData();
	world.ClearForces();

	requestAnimFrame(update);
}; 

var boundaries = {
	// "arrow": { 
	// 	id: "arrow", 
	// 	x: 10, 
	// 	y: 10, 
	// 	polys: [
	// 		[{x: -1, y: -1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}], // box
	// 		[{x: 1, y: -1.5}, {x: 2, y: 0}, {x: 1, y: 1.5} ]  // arrow 
	// 		], 
	// 	color: "green",
	// 	friction: 0.2
	// },
	"bottomWall": {
		id: "bottomWall",
		x: CANVAS_WIDTH / SCALE / 2,
		y: CANVAS_HEIGHT / SCALE,
		halfWidth: CANVAS_WIDTH / SCALE,
		halfHeight: 0.5
	},
	"topWall": {
		id: "topWall",
		x: CANVAS_WIDTH / SCALE / 2,
		y: 0,
		halfWidth: CANVAS_WIDTH / SCALE,
		halfHeight: 1
	},
	"leftWall": {
		id: "leftWall",
		x: 0,
		y: CANVAS_HEIGHT / SCALE / 2,
		halfWidth: 0.5,
		halfHeight: CANVAS_HEIGHT / SCALE
	},
	"rightWall": {
		id: "rightWall",
		x: CANVAS_WIDTH / SCALE,
		y: CANVAS_HEIGHT / SCALE / 2,
		halfWidth: 0.5,
		halfHeight: (CANVAS_HEIGHT / SCALE)
	}
}

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 60);
			};
})();
