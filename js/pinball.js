/**
 * Pinball 
 * 
 */

var Pinball = function (_x, _y) {
	this.fixDef = new b2FixtureDef;
	this.fixDef.shape = new b2CircleShape( .75 )
	this.fixDef.restitution = .8;
	this.fixDef.density = .5;

	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;	
	this.bodyDef.position.x = _x;
	this.bodyDef.position.y = _y;
	this.pinball = world.CreateBody( this.bodyDef ).CreateFixture( this.fixDef );

	var listener = new Box2D.Dynamics.b2ContactListener;

	listener.BeginContact = function(contact) {
		console.log(contact.GetFixtureA().GetBody().GetUserData());
	}
	listener.EndContact = function(contact) {
		console.log(contact.GetFixtureA().GetBody().GetUserData());
	}
	listener.PostSolve = function(contact, impulse) {
	    
	}
	listener.PreSolve = function(contact, oldManifold) {

	}

	world.SetContactListener(listener);
}

Pinball.prototype.draw = function() {
	
}

Pinball.prototype.isDead = function() {
	this.pos = this.pinball.m_body.GetPosition();
	// console.log(this.pos.y);

	if(this.pos.y > CANVAS_HEIGHT / SCALE) {
		return true;
	}
	else return false;
};