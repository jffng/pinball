/**
 *
 * Flipper creates a new pinball flipper and adds it to the physics world.
 *
 * @param {number} _xPos [description]
 * @param {number} _yPos [description]
 * @param {string} type [description]
 * 
 */

var Flipper = function(_xPos, _yPos, type, orientation) {
	var flipperWidth = 3.5,
		flipperHeight = 0.5;

	this.orientation = orientation;
	this.type = type;
	this.bodyDef = new b2BodyDef;
	this.bodyDef.type = b2Body.b2_dynamicBody;

	this.bodyDef.userData = type;

	if(type == "left") {
		// set flipping torque to clockwise
		this.flipTorque = -1;

		switch(this.orientation){
			case "top":
				this.bodyDef.position.x = _xPos + 3 * flipperWidth;
				this.bodyDef.position.y = _yPos;
				break;
			case "bottom":
				this.bodyDef.position.x = _xPos - flipperWidth;
				this.bodyDef.position.y = _yPos;
				break;
			case "left":
				this.bodyDef.position.x = _xPos;
				this.bodyDef.position.y = _yPos - 2 * flipperWidth;
				break;
			case "right":
				this.bodyDef.position.x = _xPos + 1.6 * flipperWidth;
				this.bodyDef.position.y = _yPos + 5;
				break;													
		}
	
	}

	else if(type == "right") {
		// set flipping torque to counter clockwise
		this.flipTorque = 1;

		switch(this.orientation){
			case "top":
				this.bodyDef.position.x = _xPos - 3 * flipperWidth;
				this.bodyDef.position.y = _yPos;
				break;
			case "bottom":
				this.bodyDef.position.x = _xPos + 2 * flipperWidth;
				this.bodyDef.position.y = _yPos;
				break;
			case "left":
				this.bodyDef.position.x = _xPos - 1.5 * flipperWidth;
				this.bodyDef.position.y = _yPos + 2 * flipperWidth;
				break;
			case "right":
				this.bodyDef.position.x = _xPos;
				this.bodyDef.position.y = _yPos - 5;
				break;													
		}
	
	}	

	this.sawBody = world.CreateBody(this.bodyDef);

	// define the shape of the body using the fixture definition
	var sawFixtureDef = new b2FixtureDef;	
	sawFixtureDef.shape = new b2PolygonShape;
	sawFixtureDef.shape.SetAsBox( flipperWidth, flipperHeight );
	sawFixtureDef.density = 2.0;
	sawFixtureDef.friction = 0.5;
	this.sawBody.CreateFixture(sawFixtureDef);

	var localCenter = this.sawBody.GetWorldCenter();

	// adjust the joint position according to whether it is a left or right flipper
	if(type == "left")  localCenter.Add( new b2Vec2( - 4 / 5 * flipperWidth, 0 ) );
	if(type == "right") localCenter.Add( new b2Vec2(   4 / 5 * flipperWidth, 0 ) );

	var circlebodyDef = new b2BodyDef;
	circlebodyDef.position.x = localCenter.x;
	circlebodyDef.position.y = localCenter.y;
	circlebodyDef.type = b2Body.b2_staticBody;

	var circleFixtureDef = new b2FixtureDef;
	circleFixtureDef.shape = new b2CircleShape( 0.1 );

	circleBody = world.CreateBody(circlebodyDef);
	circleBody.CreateFixture(circleFixtureDef);

	this.revoluteJointDef = new b2RevoluteJointDef;
	this.revoluteJointDef.Initialize(this.sawBody, circleBody, localCenter);	
	this.revoluteJointDef.enableLimit = true;
	this.revoluteJointDef.maxMotorTorque = 0.5;
	this.revoluteJointDef.motorSpeed = 0.0;
	this.revoluteJointDef.enableMotor = true;

	switch(this.orientation){
		case "top": 
			this.revoluteJointDef.upperAngle = 5 / 4 * Math.PI;
			this.revoluteJointDef.lowerAngle = 3 / 4 * Math.PI;
			break;

		case "bottom": 
			this.revoluteJointDef.upperAngle =   1 / 6 * Math.PI;
			this.revoluteJointDef.lowerAngle = - 1 / 6 * Math.PI;
			break;	

		case "left":
			this.revoluteJointDef.upperAngle = - 1 / 4 * Math.PI;
			this.revoluteJointDef.lowerAngle = - 3 / 4 * Math.PI;
			break;

		case "right": 
			this.revoluteJointDef.upperAngle = 3 / 4 * Math.PI;
			this.revoluteJointDef.lowerAngle = 1 / 4 * Math.PI;
			break;				
	}

	world.CreateJoint(this.revoluteJointDef);	
}

Flipper.prototype.updatePhysics = function(input) {
	var force = 100000;
	if(input){
		this.sawBody.ApplyTorque( this.torque * force );
	}
	else {
		this.sawBody.ApplyTorque( - this.torque * force);
	}
};