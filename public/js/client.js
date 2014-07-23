var token, socket;

function connect () {
	$('#login').hide( 'slow' );
	
	socket = io(token ? ('?token=' + token) : '', {
		'forceNew': true
	});

	socket.on('client position data', function (position) {
		console.log(position);
	});

	$(document).on('click', function () {

		var ball = {

			xPos: ( - 9 * Math.random() ) - 10,
			yPos: -16,
			xVelocity: ( 20 * Math.random() ) - 10,
			yVelocity: 120 * Math.random() 

		}

		socket.emit( 'ball in', ball );

	});

	socket.on('disconnect', function () {
		console.log('- disconnected');
	});

}


$('#login').submit(function (e) {
	e.preventDefault();
	var code = $('#code').val();
	console.log(code);
	$.ajax({
		type: 'POST',
 		url: '/login',
		data: JSON.stringify({
			name: 'json data',
			code: code
		}),
		 contentType: "application/json; charset=utf-8"
	}).done(function (result) {
		token = result.token;
		connect();
	});
});