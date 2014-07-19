var path = require('path');

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			main: [
				'Gruntfile.js',
				'server.js',
				'server/**/*.js'
			]
		},

		connect: {
			main: {
				options: {
					port: 80,
					keepalive: true,
					base: '.'
				}
			}
		},

		nodemon: {
			server: {
				script: 'server.js',
				options: {
					watch: [
						'server.js',
						'server/**/*.js'
					]
				}
			}
		},

		clean: [
			'client/public/vendor',
			'client/public/manifest.appcache',
			'client/public/css'
		],

		jade: {
			templates: {
				files: {
					'client/public/templates.js': 'client/src/jade/**/*.jade'
				},
				options: {
					amd: true,
					client: true,
					processName: function (name) {
						return path.basename(name, '.jade');
					}
				}
			}
		},

		stylus: {
			css: {
				expand: true,
				cwd: 'client/src/styl',
				src: ['**/*.styl'],
				dest: 'client/public/css',
				ext: '.css'
			}
		},

		watch: {
			templates: {
				files: ['client/src/jade/**/*.jade'],
				tasks: ['jade:templates'],
				options: {
					atBegin: true
				}
			},

			stylus: {
				files: ['client/src/styles/**/*.styl'],
				tasks: ['stylus:css'],
				options: {
					atBegin: true
				}
			},

			livereload: {
				files: ['src/**', 'server/views/**'],
				options: {
					livereload: true
				}
			}
		},

		appcache: {
			options: {
				basePath: './client/public/'
			},
			all: {
				dest: './client/public/manifest.appcache',
				cache: './client/public/**/*',
				network: '*'//,
//				fallback: '/ /offline.html'
			}
		}
,
		concurrent: {
			watch: {
				tasks: ['nodemon', 'watch:templates', 'watch:stylus', 'watch:livereload'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-preen');
	grunt.loadNpmTasks('grunt-appcache');

	grunt.registerTask('default', ['nodemon']);
};
