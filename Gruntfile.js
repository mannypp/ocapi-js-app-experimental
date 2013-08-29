module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        smarttabs: true
      },
      all: ['Gruntfile.js', 'cartridge/static/default/js/DW*.js', 'cartridge/static/default/js/dwconfig.js']
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['cartridge/static/default/js/dwconfig.js', 'cartridge/static/default/js/DWAPI*.js', 'cartridge/static/default/js/DWShop*.js'],
        dest: 'cartridge/static/default/js/dw-ocapi-api.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'cartridge/static/default/js/dw-ocapi-api.js',
        dest: 'cartridge/static/default/js/dw-ocapi-api.min.js'
      }
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['jshint','concat','uglify']);

};

