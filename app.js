
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var npm = require('npm');
var semver = require('semver');
var exec = require('child_process').exec;
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/bodule_modules/:name/:version/*', function(req, res, next) {
	var moduleId = req.params.name + '@' + req.params.version
	if (fs.existsSync('./public' + req.url)) {
		return next()
	}
	console.log('load ' + moduleId)
	npm.load({}, function () {
		var v = semver.valid(req.params.version)
		npm.commands.install([moduleId], function() {
			exec('node grunt.js ' + req.params.name, function(err, stdout, stderr) {
				if (err) {
					res.send(500, moduleId + " doesn't support now in bodule.org, I am working hard for it.")
				} else {
					// Use express static middleware serve the file
					// Or just send 404 for wrong url address
					next()
				}
			})
		})
	})
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
