// Pinball Flipper object

var Flipper = function(_xPos, _yPos) {
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.x = _xPos;
	bodyDef.position.y = _yPos;

	this.sawBody = world.CreateBody(bodyDef);

	var sawFixtureDef = new b2FixtureDef;
	sawFixtureDef.shape = new b2PolygonShape;
	sawFixtureDef.shape.SetAsBox( 1.1, 0.2 );
	sawFixtureDef.density = 2.0;
	sawFixtureDef.friction = 0.0;
	this.sawBody.CreateFixture(sawFixtureDef);

	var localCenter = this.sawBody.GetWorldCenter();
	localCenter.Add( new b2Vec2( -0.8, 0) );

	var circleBodyDef = new b2BodyDef;
	circleBodyDef.position.x = localCenter.x;
	circleBodyDef.position.y = localCenter.y;
	circleBodyDef.type = b2Body.b2_staticBody;

	var circleFixtureDef = new b2FixtureDef;
	circleFixtureDef.shape = new b2CircleShape( 0.1 );

	circleBody = world.CreateBody(circleBodyDef);
	circleBody.CreateFixture(circleFixtureDef);

	this.revoluteJointDef = new b2RevoluteJointDef;
	this.revoluteJointDef.Initialize(this.sawBody, circleBody, localCenter);
	this.revoluteJointDef.upperAngle = 0.6;
	this.revoluteJointDef.lowerAngle = -0.6;
	this.revoluteJointDef.enableLimit = true;
	this.revoluteJointDef.maxMotorTorque = 0.5;
	this.revoluteJointDef.motorSpeed = 0.0;
	this.revoluteJointDef.enableMotor = true;

	world.CreateJoint(this.revoluteJointDef);
}