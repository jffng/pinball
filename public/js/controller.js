var Controller = function() {
	this.lives = 1;
	this.pinballs = [];
	this.players = [];

	this.pinballs.push( new Pinball(0, 0) );

	var self = this;

	this.players.push( new Player( 'left' ) );

	this.players.push( new Player( 'right' ));

	socket.on('contact', function (data) {

		// check to see which player hit the pinball last
		// 
		// 
		if(data.fixA === 'left' || data.fixB === 'left'){

			self.pinballs[0].pinball.m_body.m_userData = 'left';

			console.log(self.pinballs[0].pinball.m_body.m_userData)

		} 

		else if (data.fixA === 'right' || data.fixB === 'right'){

			self.pinballs[0].pinball.m_body.m_userData = 'right';

			console.log(self.pinballs[0].pinball.m_body.m_userData)

		}

		if (data.fixA === 'Can' || data.fixB === 'Can'){

			for(var i = 0; i < self.players.length; i++){
				if(self.pinballs[0].pinball.m_body.m_userData === self.players[i].id){

					self.players[i].score ++;
					console.log(self.pinballs[0].pinball.m_body.m_userData);

					self.updateScore();
				}

			}

		}

	});

	socket.on('add player', function (data) {
		console.log('new player added');
		this.players.push( new Player(data.id) );
	}).on('disconnect', function (data) {
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