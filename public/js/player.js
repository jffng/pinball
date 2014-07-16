var Player = function (id) {
	this.id = id;

	this.score = 0;
	this.lives = 5;
	
	if(id === "right"){
		this.flipper = new Flipper( 9, -15.5, id, "bottom");
	} else if(id === "left") {
		this.flipper = new Flipper( - 11, -15.5, id, "bottom");
	}

	$(window).on('keypress', function(e){
		console.log(e.keyCode);
			this.flipper.sawBody.ApplyTorque(200000); 
		if(e.keyCode === 65 || e.keyCode === 97) this.flipper.sawBody.ApplyTorque(-200000);
	});

	$(window).on('keyup', function(e){
		console.log(e.keyCode);
		if(e.keyCode === 68) this.flipper.sawBody.ApplyTorque(-200000);
		if(e.keyCode === 65) this.flipper.sawBody.ApplyTorque(200000);
	});


};

Player.prototype.update = function(first_argument) {
	// body...
};

Player.prototype.addPoints = function(numPoints) {
	this.points += numPoints;
};


