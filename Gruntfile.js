"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-simple-mocha");

  var srcFiles = [ "Gruntfile.js", "test/**/sequelize*.js", "sequelize_server.js", "./models/*sequelize.js", "./routes/sequelize*.js" ];

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
        src: [ "test/sequelize*test.js" ]
      }
    },
    jscs: {
      src: srcFiles,
      options: {
        config: ".jscsrc"
      }
    }
  });

  grunt.registerTask("test", [ "jscs", "jshint", "simplemocha" ]);
};
