/** 
 *
 *	Player is a wrapper for the Flipper class, creating a pair of left and right flippers
 * 
 */

var Player = function (id, position, orientation) {
	this.id = id;
	this.position = position;
	this.orientation = orientation;



	this.leftFlipper = new Flipper(this.position.x, this.position )
}