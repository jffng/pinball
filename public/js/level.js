var Level = function(levelType) {
	if(levelType == "test") {
		this.walls = new Wall(boundaries);

		rightFlipper = new Flipper(CANVAS_WIDTH / SCALE / 2, 0.9 * CANVAS_HEIGHT / SCALE, "right", "bottom");
		leftFlipper = new Flipper(CANVAS_WIDTH / SCALE / 2, 0.9 * CANVAS_HEIGHT / SCALE, "left", "bottom");

		var obstacles = [];

		$(window).on('click', function(e){
			obstacles.push(new Can( e.clientX / SCALE, e.clientY / SCALE, undefined ));
		});

		$(window).on('keypress', function(e){
			console.log(e.keyCode);
			if(e.keyCode === 68) rightFlipper.sawBody.ApplyTorque(100000); 
			if(e.keyCode === 65) leftFlipper.sawBody.ApplyTorque(-100000);
		});

		$(window).on('keyup', function(e){
			console.log(e.keyCode);
			if(e.keyCode === 68) rightFlipper.sawBody.ApplyTorque(-100000);
			if(e.keyCode === 65) leftFlipper.sawBody.ApplyTorque(100000);
		});
	}
}

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
