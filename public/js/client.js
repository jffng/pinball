var token, socket;

function connect () {
	socket = io(token ? ('?token=' + token) : '', {
		'forceNew': true
	});

	socket.on('pong', function () {
		console.log('- pong');
	}).on('time', function (data) {
		console.log('- broadcast: ' + data);
	}).on('authenticated', function () {
		console.log('- authenticated');
	}).on('disconnect', function () {
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


connect(); //connect now, it will drop

$('#ping').on('click', function () {
	console.log('- ping');
	socket.emit('ping');
});