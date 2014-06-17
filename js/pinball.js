/**
 * Pinball 
 */

var Pinball = function (_x, _y) {
	this.fixDef = new b2FixtureDef;
	this.fixDef.shape = new b2CircleShape( Math.random() + 0.1 )
	this.fixDef.restitution = .8;

	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;	
	this.bodyDef.position.x = _x;
	this.bodyDef.position.y = _y;
	world.CreateBody( this.bodyDef ).CreateFixture( this.fixDef );	
}

Pinball.prototype.draw = function() {
	
}