$(document).ready(function () {
	// body...
	// create a new instance of a pixi stage
	var stage = new PIXI.Stage(0x00000);

	container = new PIXI.DisplayObjectContainer();
	container.position.x = window.innerWidth / 2;
	container.position.y = window.innerHeight / 2;
	stage.addChild(container);

	// create a renderer instance
	var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, null, true, true);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	var socket = io.connect();

	// requestAnimFrame(animate);

	function draw() {
		// socket.on('world', function (data) {
		// 	world = data;
		// });

		for(var bb = world.GetBodyList(); bb; bb = bb.GetNext()) {
			// get the root position of our body
			var bodyPos = bb.GetPosition();

			// if we haven't created a sprite for this body yet
			if(bb.m_userData == null) {

				var graphics = new PIXI.Graphics();

				// loop through all our fixtures;
				for(var bf = bb.GetFixtureList(); bf; bf = bf.GetNext()) {
					var shape = bf.GetShape();
					if(shape.GetType() == 1) {
						var verts = shape.GetVertices();
						graphics.beginFill(0xdd6633, 1);
						graphics.lineStyle(2, 0x000000, .5);
						for(var v = 0; v < verts.length; v++) {
							graphics.lineTo(verts[v].x * drawScale, verts[v].y * -drawScale);
						}
						graphics.lineTo(verts[0].x * drawScale, verts[0].y * -drawScale + .001);
						graphics.endFill();						
					} else if(shape.GetType() == 0) {
						graphics.beginFill(0xdd6633, 1);
						graphics.lineStyle(2, 0x000000, .5);
						var pos = shape.GetLocalPosition();
						graphics.drawCircle(pos.x, pos.y, shape.GetRadius() * drawScale);
						graphics.endFill();
					}

				}
				container.addChild(graphics);
				graphics.position.x = bodyPos.x * drawScale;
				graphics.position.y = bodyPos.y * -drawScale;
				bb.m_userData = graphics;
				graphics.mouseover = function(e) {
					console.log(e);
				}	
			} else if(bb.m_userData !== "image") {
				var s = bb.m_userData;
				s.position.x = bodyPos.x * drawScale;
				s.position.y = bodyPos.y * -drawScale;
				s.rotation = -bb.GetAngle();			
			}

		}
	}

	function animate() {
		requestAnimFrame(animate);

		// draw our objects
		draw();

	    // render the stage
	    renderer.render(stage);	
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
});

