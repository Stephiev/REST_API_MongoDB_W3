"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-simple-mocha");

  var srcFiles = [ "Gruntfile.js", "test/**/*.js", "server.js", "./models/*.js", "./routes/*.js", "./lib/**/*.js" ];

  grunt.initConfig({
    jshint: {
      files: srcFiles,
      options: {
        sub: true,
        jshintrc: true
      }
    },

    simplemocha: {
      all: {
        src: [ "test/*test.js" ]
      }
    },
    jscs: {
      src: srcFiles,
      options: {
        config: ".jscsrc"
      }
    }
  });

  grunt.registerTask("test", [ "jshint", "jscs", "simplemocha" ]);
};
