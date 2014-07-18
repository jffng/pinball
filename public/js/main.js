
var world;
var socket;
var drawScale = 32;
var container, renderer, stats, stage;
var leftPlayer = makeid();
var rightPlayer = makeid();

$(function  () {
	$('#login').submit(function (e) {
		e.preventDefault();
		var code = $('#code').val();
		$.ajax({
			type: 'POST',
	 		url: '/login',
			data: JSON.stringify({
				name: 'json data',
				code: code
			}),
			 contentType: "application/json; charset=utf-8"
		}).done(function (result) {
			token = result.token;
			connect();
		});
	});
});

function setup() {
	$('#leftPlayer').html(leftPlayer);
	$('#rightPlayer').html(rightPlayer);

		// create an new instance of a pixi stage
	stage = new PIXI.Stage(0x00000);

	// create a master container for all our objects
	container = new PIXI.DisplayObjectContainer();
	container.position.x = window.innerWidth / 2;
	container.position.y = window.innerHeight / 2;
	stage.addChild(container);

	stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '3px';
			document.body.appendChild( stats.domElement );

	// create a renderer instance
	renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null, true, true);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	// create the b2 world
	world = new b2World( new b2Vec2(0, -90), true );

	// instantiate a new level of static components
	level = new Level("test");
	controller = new Controller();

	// kick off the update + render loop
	requestAnimFrame(update);

}

function connect () {
	socket = io(token ? ('?token=' + token) : '', {
		'forceNew': true
	});

	$('#login').hide( 'slow' );

	setup();

	socket.emit('player codes', { leftPlayer: leftPlayer, rightPlayer: rightPlayer });
	
	socket.on('player connected', function (id) {
		console.log(id);

		if(id === leftPlayer) {

			console.log('left player joined');

			$('#leftPlayer').hide("slow");
		
		} else if(id === rightPlayer ) {

			console.log('right player joined');

			$('#rightPlayer').hide('slow');

		}

	}).on('player disconnected', function (id) {
		if(id === leftPlayer) {

			$('#leftPlayer').show("slow");

		} else if(id === rightPlayer){

			$('#rightPlayer').show("slow");

		}
	})

}

function draw () {
	for(var bb = world.GetBodyList(); bb; bb = bb.GetNext()) {
		// get the root position of our body
		var bodyPos = bb.GetPosition();

		// if we haven't created a sprite for this body yet
		if(bb.m_graphicsData == undefined) {

			var graphics = new PIXI.Graphics();

			// loop through all our fixtures;
			for(var bf = bb.GetFixtureList(); bf; bf = bf.GetNext()) {
				var shape = bf.GetShape();
					socket.emit( 'positions' , { id: bb.m_userData,
												position: bodyPos,
												shape: shape } );
				if(shape.GetType() == 1) {
					// if(bb.m_userData != 'left' && bb.m_userData != 'right'){

						var verts = shape.GetVertices();
						graphics.beginFill(0x0000ff, 1);
						graphics.lineStyle(2, 0x000000, .5);
						
						for(var v = 0; v < verts.length; v++) {
						
							graphics.lineTo(verts[v].x * drawScale, verts[v].y * -drawScale);
						
						}
						
						graphics.lineTo(verts[0].x * drawScale, verts[0].y * -drawScale + .001);
						graphics.endFill();		
						
					// }
				
				} else if(shape.GetType() == 0) {
					graphics.beginFill(0xff0000, 1);
					graphics.lineStyle(2, 0x000000, .5);
					var pos = shape.GetLocalPosition();
					graphics.drawCircle(pos.x, pos.y, shape.GetRadius() * drawScale);
					graphics.endFill();
				}
			}
			container.addChild(graphics);
			graphics.position.x = bodyPos.x * drawScale;
			graphics.position.y = bodyPos.y * -drawScale;
			bb.m_graphicsData = graphics;
		} else if(bb.m_graphicsData) {
				if( bodyPos.x > -20 && bodyPos.x < -10 && bodyPos.y > -20 && bodyPos.y < -10 && bb.m_userData === "pinball") {
					// console.log(bodyPos.x, bb.m_userData)

					socket.emit( 'positions' , { id: bb.m_userData,
												position: bodyPos,
												shape: shape } );

				}

				else if( bodyPos.x > 10 && bodyPos.x < 20 && bodyPos.y > -20 && bodyPos.y < -10 && bb.m_userData === "pinball"){
					// console.log(bodyPos.x, bb.m_userData)
					socket.emit( 'positions' , { id: bb.m_userData,
												position: bodyPos,
												shape: shape } );

				}

				var s = bb.m_graphicsData;
				s.position.x = bodyPos.x * drawScale;
				s.position.y = bodyPos.y * -drawScale;
				s.rotation = -bb.GetAngle();			
			}
	}
}

function update() {
	requestAnimFrame(update);

	world.Step(
		1 / 60   //frame-rate
		,  10       //velocity iterations
		,  10       //position iterations
	);


	world.ClearForces();

	controller.update();

	draw();

	renderer.render(stage);	

	stats.update();

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

function makeid()
{
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 3; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}