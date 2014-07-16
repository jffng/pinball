var Controller = function() {
	this.lives = 1;
	this.pinballs = [];
	this.players = [];

	this.pinballs.push( new Pinball(0, 0) );

	var self = this;

	this.players.push( new Player( 'left' ) );

	this.players.push( new Player( 'right' ));
	
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