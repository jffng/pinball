/**
 * Pinball 
 * 
 */

var Pinball = function (_x, _y) {
	// this.socket = io();
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;	
	this.bodyDef.position.x = _x;
	this.bodyDef.position.y = _y;

	this.fixDef = new b2FixtureDef;
	this.fixDef.shape = new b2CircleShape( .75 )
	this.fixDef.restitution = .4;
	this.fixDef.density = .75;

	this.bodyDef.userData = "pinball";
	self = this;

	this.pinball = world.CreateBody( this.bodyDef ).CreateFixture( this.fixDef );

	var listener = new Box2D.Dynamics.b2ContactListener;

	listener.BeginContact = function(contact) {
		var collidingBody = contact.GetFixtureB().GetBody().GetUserData();
		if(collidingBody == "Can"){
			console.log("Pinball hit the can");
		}
	}
	
	listener.EndContact = function(contact) {
	}

	listener.PostSolve = function(contact, impulse) {
		var collidingBody = contact.GetFixtureB().GetBody().GetUserData();
		
		if(collidingBody == "Can") {
			console.log(impulse);	
			// self.socket.emit('hit can', impulse);
		}
		if(collidingBody == "Flipper") {
			console.log(impulse);	
			// self.socket.emit('ball out', impulse);
		}		
	}

	listener.PreSolve = function(contact, oldManifold) {

	}

	world.SetContactListener(listener);
}

Pinball.prototype.draw = function() {
	
}

Pinball.prototype.isDead = function() {
	this.pos = this.pinball.m_body.GetPosition();

	if(this.pos.y < -18) {
		return true;
	}
	else return false;
};