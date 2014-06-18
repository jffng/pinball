function System (format) {
	// grab canvas
	
	// add itself to the window
	window.System = this;
	// call setup
}

System.prototype._privatesetup = function() {
	// setup any code
	// instantiate pinball
	// instantiate physics
	// this.physics = world
};

System.prototype._privateupdate = function() {
	// screen update
	// physics update
	// pinball update
	// players update
	_privatedraw();
};

System.prototype._privatedraw = function() {
	// draw anything
	// draw pinball
	requestAnimationFrame( this._privateupdate.bind(this) );
};

// single player pinball game
// make sure your players can die. death event
// collision
// 
// game controller class that spawns / kills ball and keeps track of whether its alive
// 
// ball class contains the fixtures and body initializes, attach itself to the collision events

// spawning players
// keeping track of score + lives

// level class

// game controller spawns flipper + ball


