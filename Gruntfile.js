"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jscs");
  // grunt.loadNpmTasks("grunt-simple-mocha");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-webpack');

  var srcFiles = [ "Gruntfile.js", "test/**/*.js", "server.js", "./models/*.js", "./routes/*.js", "app/**/*.js" ];


grunt.initConfig({
     jshint: {
      files: srcFiles,
      options: {
        sub: true,
        jshintrc: true
      }
    },
     jscs: {
      src: srcFiles,
      options: {
        config: ".jscsrc"
      }
    },
    clean: {
      dev: {
        src: 'build/'
      }
    },
    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src: '**/*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.js',
        output: {
          path: 'build/',
          file: 'bundle.js'
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'bundle.js'
        }
      }
    }

  });

  grunt.registerTask('jshint', ['jshint:dev']);
  grunt.registerTask('build', ['webpack:client', 'copy:html', 'test']);
  grunt.registerTask('test', ['webpack:test']);
  // grunt.initConfig({
  //   jshint: {
  //     files: srcFiles,
  //     options: {
  //       sub: true,
  //       jshintrc: true
  //     }
  //   },

  //   simplemocha: {
  //     all: {
  //       src: [ "test/*test.js" ]
  //     }
  //   },
  //   jscs: {
  //     src: srcFiles,
  //     options: {
  //       config: ".jscsrc"
  //     }
  //   }
  // });

  grunt.registerTask("test", [ "jshint", "jscs", "simplemocha" ]);
};
