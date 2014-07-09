$(function  () {
	setup();
})

function setup() {
	document.getElementById('c').width = CANVAS_WIDTH;
	document.getElementById('c').height = CANVAS_HEIGHT;	

	$(window).resize( function () {
		CANVAS_WIDTH = window.innerWidth;
		CANVAS_HEIGHT = window.innerHeight;
		document.getElementById('c').width = CANVAS_WIDTH;
		document.getElementById('c').height = CANVAS_HEIGHT;		
	});

	// create the b2 world
	world = new b2World( new b2Vec2(-1, 10), true );

	// instantiate a new level of static components
	level = new Level("test");
	controller = new Controller();

	// kick off the update + render loop
	requestAnimFrame(update);

	// Box2D debug rendering
	var debugDraw = new b2DebugDraw();
	debugDraw.SetSprite(document.getElementById("c").getContext("2d"));
	debugDraw.SetDrawScale(SCALE);
	debugDraw.SetFillAlpha(0.3);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);
}

function update() {
	world.Step(
		1 / 60   //frame-rate
		,  10       //velocity iterations
		,  10       //position iterations
	);

	controller.update();

	world.DrawDebugData();
	world.ClearForces();

	requestAnimFrame(update);
};

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