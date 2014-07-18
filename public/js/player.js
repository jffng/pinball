var Player = function (id) {
	this.id = id;

	this.score = 0;
	this.lives = 5;

	if(id === leftPlayer){
		var flipper = new Flipper( -11.8, -15.5, 'left', 'bottom');

		$(window).on('keypress', function(e){

			if(e.keyCode === 97) flipper.sawBody.ApplyTorque(400000); 

		});

	} else if(id === rightPlayer) {
		var flipper = new Flipper( 9, -15.5, 'right', 'bottom');
	
		$(window).on('keypress', function(e){

			if(e.keyCode === 100) flipper.sawBody.ApplyTorque(-400000); 

		});

	}

};

Player.prototype.update = function(first_argument) {
	// body...
};

Player.prototype.addPoints = function(numPoints) {
	this.score += numPoints;
};


