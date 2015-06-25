"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-webpack");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  var srcFiles = [ "Gruntfile.js", "test/**/*test.js", "server.js", "./models/*.js", "./routes/*.js", "app/**/*.js", "./test/karma_tests/test_entry.js" ];

  grunt.initConfig({

    webpack: {
      client: {
        entry: __dirname + "/app/js/client.js",
        output: {
          path: "build/",
          file: "bundle.js"
        }
      },
      test: {
        entry: __dirname + "/test/client/test.js",
        output: {
          path: "test/client/",
          file: "bundle.js"
        }
      },
      karmaTest: {
        entry: __dirname + "/test/karma_tests/test_entry.js",
        output: {
          path: "test/karma_tests",
          file: "bundle.js"
        }
      }
    },

    karma: {
      test: {
        configFile: "karma.conf.js"
      }
    },

    copy: {
      html: {
        cwd: "app/",
        expand: true,
        flatten: false,
        src: "**/*.html",
        dest: "build/",
        filter: "isFile"
      }
    },

    clean: {
      dev: {
        src: "build/"
      }
    },

// Fix linted and jscsd files
       jshint: {
      dev: {
        src: [ "Gruntfile.js", "server.js", "models/**/*.js", "./routes/**/*.js" ],
        options: {
          node: true,
          globals: {
            describe: true,
            it: true,
            before: true,
            after: true,
            beforeEach: true,
            afterEach: true

          }
        }
      },
      jasmine: {
        src: [ "test/karma_tests/*test.js" ],
        options: {
          node: true,
          jasmine: true,
          globals: {
            describe: true,
            it: true,
            before: true,
            after: true,
            beforeEach: true,
            afterEach: true,
            expect: true,
            angular: true
          }
        }
      },
      mocha: {
        src: [ "test/client/*test.js", "./app/js/*.js" ],
        options: {
          node: true,
          globals: {
            describe: true,
            it: true,
            before: true,
            after: true,
            beforeEach: true,
            afterEach: true,
            angular: true
          }
        }
      }
    },
      //task automation
    watch: {
      js: {
        files: ['app/js/**/*.js'],
        tasks: ['build'],
      },
      html: {
        files: ['app/**/*.html'],
        tasks: ['copy:html'],
      }
      // css: {
      //   files: ['app/**/*.scss'],
      //   tasks: ['sass', 'autoprefixer:sass'],
      // }
    },
    //not sure if/how this works. check with Stefan
    nodemon: {
      dev: {
        script: 'server.js',
      }
    },
    concurrent: {
      nodemonWatch: ['nodemon:dev', 'watch'],
    },

    jscs: {
      src: srcFiles,
      options: {
        config: ".jscsrc"
      }
    }
  });

  grunt.registerTask("pretty", [ "jshint:mocha", "jshint:dev", "jshint:jasmine", "jscs" ]);
  grunt.registerTask("build:dev", [ "webpack:client", "copy:html", "test" ]);
  grunt.registerTask("build", [ "build:dev" ]);
  grunt.registerTask("test", [ "webpack:test" ]);
  grunt.registerTask("default", [ "build", "pretty" ]);
  grunt.registerTask("karmatest", ["webpack:karmaTest", "karma:test"])
  // grunt.registerTask("karmaBuild", [ "webpack:karmaTest" ]);
  grunt.registerTask("run", [ "default" ]);
  grunt.registerTask('serve:dev', [ 'build:dev', 'concurrent:nodemonWatch' ]);


};
