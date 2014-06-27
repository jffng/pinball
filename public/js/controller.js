var Controller = function() {
	this.lives = 5;
	this.pinballs = [];

	this.pinballs.push( new Pinball(CANVAS_WIDTH / SCALE / 2 - 1, CANVAS_HEIGHT / SCALE / 2) );
}

Controller.prototype.update = function() {
	if(this.lives){
		for(var i = 0; i < this.pinballs.length; i++){
			if(this.pinballs[i].isDead()){
				this.pinballs.splice(i, 1);
				this.pinballs.push( new Pinball(CANVAS_WIDTH / SCALE / 2, CANVAS_HEIGHT / SCALE / 2) );
				--this.lives;
			}
		}		
	}
	else{
	}
};