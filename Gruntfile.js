// "use strict";

// module.exports = function(grunt) {
//   grunt.loadNpmTasks("grunt-webpack");
//   grunt.loadNpmTasks("grunt-contrib-copy");
//   grunt.loadNpmTasks("grunt-contrib-clean");
//   grunt.loadNpmTasks("grunt-contrib-jshint");
//   grunt.loadNpmTasks("grunt-jscs");

//   var srcFiles = [ "Gruntfile.js", "test/**/*test.js", "server.js", "./models/*.js", "./routes/*.js", "app/**/*.js" ];

//   grunt.initConfig({

//     webpack: {
//       client: {
//         entry: __dirname + "/app/js/client.js",
//         output: {
//           path: "build/",
//           file: "bundle.js"
//         }
//       },
//       test: {
//         entry: __dirname + "/test/client/test.js",
//         output: {
//           path: "test/client/",
//           file: "bundle.js"
//         }
//       }
//     },

//     copy: {
//       html: {
//         cwd: "app/",
//         expand: true,
//         flatten: false,
//         src: "**/*.html",
//         dest: "build/",
//         filter: "isFile"
//       }
//     },

//     clean: {
//       dev: {
//         src: "build/"
//       }
//     },

//      jshint: {
//       files: srcFiles,
//       options: {
//         sub: true,
//         jshintrc: true
//       }
//     },

//     jscs: {
//       src: srcFiles,
//       options: {
//         config: ".jscsrc"
//       }
//     }
//   });

//   grunt.registerTask("build:dev", [ "webpack:client", "copy:html", "test" ]);
//   grunt.registerTask("build", [ "build:dev" ]);
//   grunt.registerTask("test", [ "webpack:test" ]);
//   grunt.registerTask("pretty", [ "jshint", "jscs" ]);
//   grunt.registerTask("default", [ "build", "pretty" ]);
//   grunt.registerTask("run", [ "default" ]);
// };


'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({
    webpack: {
      client: {
        entry: __dirname + '/app/js/client.jsx',
        output: {
          path: 'build/',
          file: 'bundle.js'
        },
        module: {
          loaders: [
            {
              test: /\.jsx$/,
              loader: 'jsx-loader'
            }
          ]
        }
      },
      test: {
        entry: __dirname + '/test/client/test.js',
        output: {
          path: 'test/client/',
          file: 'test_bundle.js'
        }
      },
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

    clean: {
      dev: {
        src: 'build/'
      }
    }
  });

  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('default', ['build']);
};
