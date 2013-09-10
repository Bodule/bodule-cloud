module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    clean:
      options:
        force: true
      bodule: "../../public/bodule_modules/<%= pkg.name %>/<%= pkg.version %>"

    bodule:
      bodule:
        files:
          '../../public/bodule_modules/<%= pkg.name %>/': '<%= pkg.main %>'

  grunt.loadTasks '../grunt-contrib-clean/tasks/'
  grunt.loadTasks '../grunt-bodule-wrapping/tasks/'
  grunt.registerTask 'default', ['clean', 'bodule']
