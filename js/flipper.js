// Pinball Flipper object


var Flipper = function() {
	var bodyDef = new b2BodyDef;
	bodyDef.type = b2Body.b2_dynamicBody;
	bodyDef.position.x = CANVAS_WIDTH / SCALE / 2;
	bodyDef.position.y = CANVAS_HEIGHT / SCALE / 2;

	sawBody = world.CreateBody(bodyDef);

	var sawFixtureDef = new b2FixtureDef;
	sawFixtureDef.shape = new b2PolygonShape;
	sawFixtureDef.shape.SetAsBox( 1.1, 0.2 );
	sawFixtureDef.density = 2.0;
	sawFixtureDef.friction = 0.0;
	sawBody.CreateFixture(sawFixtureDef);

	var localCenter = sawBody.GetWorldCenter();
	localCenter.Add( new b2Vec2( -0.8, 0) );

	var circleBodyDef = new b2BodyDef;
	circleBodyDef.position.x = localCenter.x;
	circleBodyDef.position.y = localCenter.y;
	circleBodyDef.type = b2Body.b2_staticBody;

	var circleFixtureDef = new b2FixtureDef;
	circleFixtureDef.shape = new b2CircleShape( 0.1 );

	circleBody = world.CreateBody(circleBodyDef);
	circleBody.CreateFixture(circleFixtureDef);

	revoluteJointDef = new b2RevoluteJointDef;
	revoluteJointDef.Initialize(sawBody, circleBody, localCenter);
	revoluteJointDef.upperAngle = 0.6;
	revoluteJointDef.lowerAngle = -0.6;
	revoluteJointDef.enableLimit = true;
	revoluteJointDef.maxMotorTorque = 0.5;
	revoluteJointDef.motorSpeed = 0.0;
	revoluteJointDef.enableMotor = true;

	world.CreateJoint(revoluteJointDef);
}