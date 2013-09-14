var grunt = require('grunt');

require('coffee-script');
var gruntfile = require('./Gruntfile');

var oldCwd = process.cwd()
process.chdir(oldCwd + '/node_modules/' + process.argv[2])
gruntfile(grunt)
grunt.task.run('default')
grunt.task.start()