var Controller = function() {
	this.lives = 1;
	this.pinballs = [];
	this.players = [];

	this.pinballs.push( new Pinball(0, 0) );

	var self = this;

	// this.players.push( new Player( leftPlayer ) );

	// this.players.push( new Player( rightPlayer ));

	socket.on('contact', function (data) {

		// check to see which player hit the pinball last

		if(data.fixA === leftPlayer || data.fixB === leftPlayer){

			self.pinballs[0].pinball.m_body.m_player = leftPlayer;

			// console.log(self.pinballs[0].pinball.m_body.m_player)

		} 

		else if (data.fixA === rightPlayer || data.fixB === rightPlayer){

			self.pinballs[0].pinball.m_body.m_player = rightPlayer;

			// console.log(self.pinballs[0].pinball.m_body.m_player)

		}

		if (data.fixA === 'Can' || data.fixB === 'Can'){

			for(var i = 0; i < self.players.length; i++){
				if(self.pinballs[0].pinball.m_body.m_player === self.players[i].id){

					self.players[i].addPoints(1);
					console.log(self.pinballs[0].pinball.m_body.m_player);

					self.updateScore();
				}

			}

		}

	});

	socket.on('player connected', function (id) {
		console.log(id + ' joined the game');
		self.players.push( new Player( id ) );
	}).on('player disconnected', function (data) {
		// body...
	});
}

Controller.prototype.update = function() {
 	if(this.lives){
			for(var i = 0; i < this.pinballs.length; i++){
				if(this.pinballs[i].isDead()){
					this.pinballs.splice(i, 1);
					this.pinballs.push( new Pinball(.5, 0) );
					// --this.lives;
				}
			}		
		}
		else{
		}
};

Controller.prototype.updateScore = function() {

	$('#scoreLeft').html('<span style="font-size: 64px;">' + this.players[0].score + '</span>');

	$('#scoreRight').html('<span style="font-size: 64px;">' + this.players[1].score + '</span>');

};