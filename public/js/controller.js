var Controller = function() {
	this.lives = 5;
	this.pinballs = [];

	this.pinballs.push( new Pinball(0, 0) );
}

Controller.prototype.update = function() {
 	if(this.lives){
			for(var i = 0; i < this.pinballs.length; i++){
				if(this.pinballs[i].isDead()){
					this.pinballs.splice(i, 1);
					this.pinballs.push( new Pinball(0, 0) );
					--this.lives;
				}
			}		
		}
		else{
		}
};