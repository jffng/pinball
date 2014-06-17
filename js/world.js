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
	world = new b2World( new b2Vec2(0, 5), true );

	// leftFlipper = new Flipper( CANVAS_WIDTH / SCALE / 2 , 15 , "left", "bottom");
	// rightFlipper = new Flipper( CANVAS_WIDTH / SCALE / 2 - 1.6, 20 , "right", "bottom");

	rightFlipperTest = new Flipper(15, 15, "right", "bottom");
	leftFlipperTest = new Flipper(15, 15, "left", "bottom");

	var walls = new Wall(boundaries);

	$(window).on('click', function(e){
		obstacles.push(new Can( e.clientX / SCALE, e.clientY / SCALE, undefined ));
		pinballs.push(new Pinball(e.clientX / SCALE, e.clientY / SCALE + 0.5 ));			
	});

	$(window).on('keypress', function(e){
		console.log(e.keyCode);
		if(e.keyCode === 97) rightFlipperTest.sawBody.ApplyTorque(100000); 
		if(e.keyCode === 100) leftFlipperTest.sawBody.ApplyTorque(-100000);
	});

	$(window).on('keyup', function(e){
		// console.log(e.keyCode);
		if(e.keyCode === 65) rightFlipperTest.sawBody.ApplyTorque(-100000);
		if(e.keyCode === 68) leftFlipperTest.sawBody.ApplyTorque(100000);
		// input = false;
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

var FlipperTest = function(_xPos, _yPos) {
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.x = _xPos;
	bodyDef.position.y = _yPos;

	this.sawBody = world.CreateBody(bodyDef);

	var sawFixtureDef = new b2FixtureDef;
	sawFixtureDef.shape = new b2PolygonShape;
	sawFixtureDef.shape.SetAsBox( 2.5, 0.5 );
	sawFixtureDef.density = 2.0;
	sawFixtureDef.friction = 0.0;
	this.sawBody.CreateFixture(sawFixtureDef);

	var localCenter = this.sawBody.GetWorldCenter();

	// adjust the joint position according to whether it is a left or right flipper
	// torque is clockwise by default (i.e. negative torque is counter-clockwise)
	localCenter.Add( new b2Vec2( 2 , 0 ) );
	this.torque = 2000;

	var circleBodyDef = new b2BodyDef;
	circleBodyDef.position.x = localCenter.x;
	circleBodyDef.position.y = localCenter.y;
	circleBodyDef.type = b2Body.b2_staticBody;

	var circleFixtureDef = new b2FixtureDef;
	circleFixtureDef.shape = new b2CircleShape( 0.1 );

	circleBody = world.CreateBody(circleBodyDef);
	circleBody.CreateFixture(circleFixtureDef);

	this.revoluteJointDef = new b2RevoluteJointDef;
	this.revoluteJointDef.Initialize(this.sawBody, circleBody, localCenter);	
	this.revoluteJointDef.upperAngle =  3 / 4 * Math.PI;
	this.revoluteJointDef.lowerAngle =  1 / 4 * Math.PI;
	this.revoluteJointDef.enableLimit = true;
	this.revoluteJointDef.maxMotorTorque = 0.5;
	this.revoluteJointDef.motorSpeed = 0.0;
	this.revoluteJointDef.enableMotor = true;	

	world.CreateJoint(this.revoluteJointDef);	
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
	"arrow": { 
		id: "arrow", 
		x: 10, 
		y: 10, 
		polys: [
			[{x: -1, y: -1}, {x: 1, y: -1}, {x: 1, y: 1}, {x: -1, y: 1}], // box
			[{x: 1, y: -1.5}, {x: 2, y: 0}, {x: 1, y: 1.5} ]  // arrow 
			], 
		color: "green",
		friction: 0.2
	},
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
