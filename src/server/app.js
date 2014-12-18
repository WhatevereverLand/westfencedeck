var express = require('express');
var app = new express();

var staticPath = __dirname + '/../public/_build'

app.use('/', express.static(staticPath));
app.use('/images', express.static(staticPath + '/images'));

var server = app.listen(8080, function() {
	console.log('Listening on port %d', server.address().port);
});
