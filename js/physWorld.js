$(function () {
	document.getElementById('c').width = window.innerWidth;
	document.getElementById('c').height = window.innerHeight;	

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
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

function init () {
	world = new b2World( new b2Vec2(0, 5), true );

	// Box2D debug simulation
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);

	pinballs = [];

	$(window).on('click', function(e){
		console.log(e.clientX);
		pinballs[i] = new Pinball(e.clientX / SCALE, e.clientY / SCALE + 0.1 );	
	});

	addWall(walls);

	requestAnimFrame(update);
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

var Pinball = function (_x, _y) {
	this.fixDef = new b2FixtureDef;
	this.fixDef.shape = new b2CircleShape( Math.random() + 0.1 )
	this.fixDef.restitution = 1;

	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;	
	this.bodyDef.position.x = _x;
	this.bodyDef.position.y = _y;
	world.CreateBody( this.bodyDef ).CreateFixture( this.fixDef );	
}

function addWall(bodyEntities) {
	this.bodyDef = new b2BodyDef;
    this.bodyDef.type = b2Body.b2_staticBody;

 	this.fixDef = new b2FixtureDef;   
    
	for(var id in bodyEntities) {
		var entity = bodyEntities[id];

		this.bodyDef.position.x = entity.x;
		this.bodyDef.position.y = entity.y;
		this.bodyDef.userData = entity.id;
		var body = this.world.CreateBody(this.bodyDef);

		if (entity.polys) {
			for (var j = 0; j < entity.polys.length; j++) {
				var points = entity.polys[j];
				var vecs = [];
				for (var i = 0; i < points.length; i++) {
					var vec = new b2Vec2();
					vec.Set(points[i].x, points[i].y);
					vecs[i] = vec;
				}
				this.fixDef.shape = new b2PolygonShape;
				this.fixDef.shape.SetAsArray(vecs, vecs.length);
				body.CreateFixture(this.fixDef);
			}
		} else {
			this.fixDef.shape = new b2PolygonShape;
			this.fixDef.shape.SetAsBox(entity.halfWidth, entity.halfHeight);
			body.CreateFixture(this.fixDef);
		}
		world.CreateBody( bodyDef ).CreateFixture( fixDef );    
	}
}

var walls = {
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
		halfHeight: 1
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
		halfWidth: 1,
		halfHeight: CANVAS_HEIGHT / SCALE
	},
	"rightWall": {
		id: "rightWall",
		x: CANVAS_WIDTH / SCALE,
		y: CANVAS_HEIGHT / SCALE / 2,
		halfWidth: 1,
		halfHeight: CANVAS_HEIGHT / SCALE
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
