var restify = require('restify');
var mysql = require('mysql');
	
var formatters = require('./formatters');	

var server;

server = restify.createServer({
	formatters: {
		'application/json': formatters.formatJSON,
	}
});
	
var c = mysql.createConnection({
	host: 'aionlabs.de',
	user: 'cashtrack',
	password: 'V7G6XTQAPcPUYBJM',
});

/*
c.connect(function(err) {
	if( err ) return cb(err);
	
	server.db = c;
	
	
});
*/
server.listen( 80, function() {
		
	});
	
server.use( restify.bodyParser({mapParams: false}) );
server.use( restify.queryParser({mapParams: false}) );

server.on('error', function(req, res, route, err) {
	res.send(err);
});

server.on('uncaughtException', function(req,res,route,err) {
	if( err instanceof errors.CatchableError ) {
		console.log('Catchable Error: ' + err);
		res.send(err.status, err);
	} else {
		console.log('Uncaught exception: ');
		console.log(err);
		console.log(err.stack);
	}
});

server.get('/api/users/:id/categories/', function(req, res, next) {
	res.send([
		{
			name: 'Gehalt',
			type: 'source',
			icon: 'coin',
			value: 5400,
			budget: 10200,
			color: '#2ecc71'
		},
		{
			name: 'Bank',
			type: 'source',
			icon: 'library',
			value: 100000,
			budget: null,
			color: '#c0392b'
		}
	]);
});

server.get( /.*/, restify.serveStatic({
	directory: './static',
	default: 'index.html',
}));


// 01725197294