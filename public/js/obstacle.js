/**
 * Obstacle 
 *
 * @param { JSON } [bodyEntities] [description]
 */

var Obstacle = function(xPos, yPos, bodyEntities) {
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_staticBody;

	this.fixDef = new b2FixtureDef;	

	this.bodyDef.position.x = xPos;
	this.bodyDef.position.y = yPos;
}

/**
 * updatePosition sets the new position of the obstacle if it moves in physical space
 * 
 */

Obstacle.prototype.updatePosition = function (input, coordinateX, coordinateY) {
	
}

/**
 * Can extends the Obstacle class to create a static obstacle in the game.
 *
 * @param { float } xPos is the initial x-coordinate of the can in the box 2d world space
 * @param { float } yPos is the initial y-coordinate of the can in the box 2d world space
 * 
 */

var Can = function(xPos, yPos, bodyEntities) {
	this.inheritsFrom = Obstacle;
	this.inheritsFrom(xPos, yPos, undefined);


	this.fixDef.shape = new b2CircleShape( 1 );
	this.fixDef.restitution = 1;

	world.CreateBody( this.bodyDef ).CreateFixture( this.fixDef );	
}

var Bottle = function() {
	this.inheritsFrom = Obstacle;
	this.inheritsFrom();
}

var Glass = function() {
	this.inheritsFrom = Obstacle;
	this.inheritsFrom();
}

var Wall = function (bodyEntities) {
	this.inheritsFrom = Obstacle;
	this.inheritsFrom(undefined, undefined, bodyEntities);

	for(var id in bodyEntities) {
		var entity = bodyEntities[id];

		this.bodyDef.position.x = entity.x;
		this.bodyDef.position.y = entity.y;
		// this.bodyDef.userData = entity.id;
		this.fixDef.friction = entity.friction;
		// var body = world.CreateBody(this.bodyDef);

		if (entity.polys) {
			for (var j = 0; j < entity.polys.length; j++) {
				var points = entity.polys[j];
				var vecs = [];
				for (var i = 0; i < points.length; i++) {
					var vec = new b2Vec2();
					vec.Set(points[i].x, points[i].y);
					vecs[i] = vec;
				}
				this.fixDef.shape = new b2PolygonShape;
				this.fixDef.shape.SetAsArray(vecs, vecs.length);
				// body.CreateFixture(this.fixDef);
			}
		} else {
			this.fixDef.shape = new b2PolygonShape;
			this.fixDef.shape.SetAsBox(entity.halfWidth, entity.halfHeight);
			// body.CreateFixture(this.fixDef);
		}
		world.CreateBody( this.bodyDef ).CreateFixture( this.fixDef );    
	}
}