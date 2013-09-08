
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var npm = require('npm');
var grunt = require('grunt');
var gruntfile = require('./Gruntfile');

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
app.get('/users', user.list);
app.get('/bodule_modules/:name/:version/*', function(req, res, next) {
	var moduleId = req.params.name + '@' + req.params.version
	console.log(moduleId)
	npm.load({}, function () {
		npm.commands.install([moduleId], function() {
			var oldCwd = process.cwd()
			console.log(process.cwd() + '/node_modules/' + req.params.name + '/')
			process.chdir(oldCwd + '/node_modules/' + req.params.name)
			gruntfile(grunt)
			grunt.task.run('default')
			grunt.task.start()
			process.chdir(oldCwd)
			next()
		})
	})
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
