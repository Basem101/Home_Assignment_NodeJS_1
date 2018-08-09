// primary file for "Hello World!" API"

// dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// instantiate httpServer
const httpServer = http.createServer(function(req, res) {

	// get the url object
	const parsedURL = url.parse(req.url, true);
	// get pathname
	const pathName = parsedURL.pathname;
	// get trimmed path
	const trimmedPath = pathName.replace(/^\/+|\/+$/g, '');
	// get request method
	const method = req.method.toLowerCase();

	const decoder = new StringDecoder('utf-8');
	let buffer = '';

	req.on('data', function (data) {
		buffer += decoder.write(data);
	});

	req.on('end', function () {
		buffer += decoder.end();
		// select a handler for each route. if route is not defined, fire notFound handler
		const selectedHandler = typeof(router[trimmedPath]) !== 'undefined' && method === 'post' ? router[trimmedPath] : handlers.notFound;
		// execute selectHandler
		selectedHandler(function(statusCode, data) {
			// validate statusCode type
			statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
			// validate data type
			data = typeof(data) === 'object' ? data : {};

			// stringify data
			const dataStr = JSON.stringify(data)
			res.setHeader('Content-type', 'application/json');
			res.writeHead(statusCode);
			res.end(dataStr);
		});
	});
});

// define handlers container
const handlers = {};

// hello handler
handlers.hello = function(callback) {
	callback(200, {"message": "welcome! this is my first home assignment :)"});
};

// notFound handler
handlers.notFound = function(callback) {
	callback(404);
};

// create router object. define hellp route
const router = {
	'hello': handlers.hello
};

// execute http server
httpServer.listen(3000, function(){
	console.log('server is running on port 3000');
});