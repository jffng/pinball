var token, socket;

function connect () {
	$('#login').hide( 'slow' );
	
	socket = io(token ? ('?token=' + token) : '', {
		'forceNew': true
	});

	socket.on('client position data', function (position) {
		console.log(position);
	}).on('disconnect', function () {
		console.log('- disconnected');
	});

	// da
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