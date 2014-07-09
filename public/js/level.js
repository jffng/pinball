var Level = function (levelType) {
	if(levelType == "test")	{
		loadRubeScene('testlevel.json')
		this.socket = io();
		// this.walls = new Wall(boundaries);

		// rightFlipper = new Flipper(CANVAS_WIDTH / SCALE / 2, 0.9 * CANVAS_HEIGHT / SCALE, "right", "bottom");
		// leftFlipper = new Flipper(CANVAS_WIDTH / SCALE / 2, 0.9 * CANVAS_HEIGHT / SCALE, "left", "bottom");

		// this.obstacles = [];

		// $(window).on('click', function(e){
		// 	this.obstacles.push(new Can( e.clientX / SCALE, e.clientY / SCALE, undefined ));
		// });

		// $(window).on('keypress', function(e){
		// 	console.log(e.keyCode);
		// 	if(e.keyCode === 68 || e.keyCode === 100) rightFlipper.sawBody.ApplyTorque(100000); 
		// 	if(e.keyCode === 65 || e.keyCode === 97) leftFlipper.sawBody.ApplyTorque(-100000);
		// });

		// $(window).on('keyup', function(e){
		// 	console.log(e.keyCode);
		// 	if(e.keyCode === 68) rightFlipper.sawBody.ApplyTorque(-100000);
		// 	if(e.keyCode === 65) leftFlipper.sawBody.ApplyTorque(100000);
		// });

		// this.socket.on('obstacle', function (obstacleArray) {
		// 	if(obstacles.length < obstacleArray.length){
		// 		var numberOfObstaclesToAdd = obstacleArray.length - obstacles.length;
		// 		for( var i = 0; i < numberOfObstaclesToAdd; i++){
		// 			this.addObstacle(obstacleArray[i]);
		// 		}
		// 	} else if ( obstacles.length > obstaclesArray.length ) {
		// 		// some code that identifies which obstacle needs removing and removes it
		// 	}
		// }
	}
}

function loadRubeScene(sceneFile) {

		loading = true;

		stage.removeChild(container);

		// create a master container for all our objects
		container = new PIXI.DisplayObjectContainer();
		container.position.x = window.innerWidth / 2;
		container.position.y = window.innerHeight / 2;		
		stage.addChild(container);
		
		// begin our animation loop
				
		 $.getJSON(sceneFile, function(data) {

		     	worldSettings = data;
		 		// spin up a box2d world
				// world = new b2World(
				//    new b2Vec2(data.gravity.x, data.gravity.y)    //gravity
				//    ,  data.allowSleep                 //allow sleep
				// );

		        loadSceneFromRUBE(data);
		        var images = new Array();
		        console.log('getting  json');

		        // create sprites for each object
		        if(typeof(world.images) !== "undefined") {
		        	console.log('creating sprites');
			        for(var i = 0; i < world.images.length; i++) {
			        	images[i] = new Image();
			        	images[i].myIndex = i;
			        	world.images[i].body.m_userData = "image";
			        	images[i].onload = function() {
			        		var bt = new PIXI.BaseTexture(this);
				        	var tex = new PIXI.Texture(bt);
				        	var sprite = new PIXI.Sprite(tex);
				        	sprite.anchor.x = .5;
				        	sprite.anchor.y = .5;
				    		var scaleFactor = world.images[this.myIndex].scale / (sprite.height / drawScale);
				    		console.log(scaleFactor);
				        	sprite.height = scaleFactor * sprite.height;
				        	sprite.width = scaleFactor * sprite.width;
				        	container.addChild(sprite);
				        	world.images[this.myIndex].body.m_userData = sprite;        		
			        	}
			        	images[i].src = "images/" + world.images[i].file;
			        }        	
		        }

		        loading = false;
				
		     });
	}


Level.prototype.addObstacle = function(stuff_about_the_obstacle) {

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
	"bottomWallLeftSegment": {
		id: "bottomWallL",
		x: CANVAS_WIDTH / SCALE / 6,
		y: 0.9 * CANVAS_HEIGHT / SCALE,
		halfWidth: CANVAS_WIDTH / SCALE / 4.5,
		halfHeight: 0.5,
		friction: 2.0
	},
	"bottomWallRightSegment": {
		id: "bottomWallR",
		x: 5 * CANVAS_WIDTH / SCALE / 6,
		y: 0.9 * CANVAS_HEIGHT / SCALE,
		halfWidth: CANVAS_WIDTH / SCALE / 6,
		halfHeight: 0.5,
		friction: 2.0
	},
	"topWall": {
		id: "topWall",
		x: CANVAS_WIDTH / SCALE / 2,
		y: 0,
		halfWidth: CANVAS_WIDTH / SCALE,
		halfHeight: 1,
		friction: 1.0
	},
	"leftWall": {
		id: "leftWall",
		x: 0,
		y: CANVAS_HEIGHT / SCALE / 2,
		halfWidth: 0.5,
		halfHeight: CANVAS_HEIGHT / SCALE,
		friction: 2.0
	},
	"rightWall": {
		id: "rightWall",
		x: CANVAS_WIDTH / SCALE,
		y: CANVAS_HEIGHT / SCALE / 2,
		halfWidth: 0.5,
		halfHeight: (CANVAS_HEIGHT / SCALE),
		friction: 2.0
	}
}
