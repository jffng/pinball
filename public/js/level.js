var Level = function (levelType) {
	if(levelType == "test")	{
		loadRubeScene('testlevel.json')

		this.obstacles = [];

		var self = this;
		$(window).on('click', function(e){
			var xCoordinate = ( e.clientX * 60 / 1920 ) - 30;
			var yCoordinate = -1 * ( ( e.clientY * 32 / 1080 ) - 17 ) ;
			// console.log(xCoordinate);
			// console.log(yCoordinate);
			self.obstacles.push(new Can( xCoordinate, yCoordinate, undefined ));
		});

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

