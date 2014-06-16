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