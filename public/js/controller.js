var Controller = function() {

	this.pinballs = [];
	this.players = [];

	this.pinballs.push( new Pinball(0, 0) );


	var self = this;
	this.socket.on('new player', function (data) {
		console.log('new player added');
		console.log(data);
});
}

Controller.prototype.update = function() {
 	if(this.lives){
			for(var i = 0; i < this.pinballs.length; i++){
				if(this.pinballs[i].isDead()){
					this.pinballs.splice(i, 1);
					this.pinballs.push( new Pinball(-12, 0) );
					--this.lives;
				}
			}		
		}
		else{
		}
};