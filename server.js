// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express

function getNumberToStr(num) {
	return ("0" + parseInt(num)).slice(-2);
}

function detectAttack(headers) {
	for (header in headers) {
		// attack detected
		if (headers[header].indexOf("() {") >= 0) {
			console.log("attack payload in header '%s': %s", header, headers[header]);
		}
	}
}

// to monitor all requests
app.use(function (req, res, next) {
	var now     = new Date();
    var hour    = getNumberToStr(now.getHours());
    var minute  = getNumberToStr(now.getMinutes());
    var second  = getNumberToStr(now.getSeconds());
	console.log("[%s:%s.%s] [%s] [%s %s]", hour, minute, second, req.connection.remoteAddress, req.method, req.url);
	detectAttack(req.headers);
  	next();
})

var port = process.env.PORT || 8080; 		// set our port
var router = express.Router(); 				// get an instance of the express Router

// all of our routes will be prefixed with /
app.use('/', router);

router.get('*', function(req, res){
	res.status(200);
	res.end('');
});

app.listen(port);
console.log('Magic happens on port ' + port);