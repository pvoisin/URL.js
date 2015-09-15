module.exports = function(grunt) {
	grunt.initConfig({
		browserify: {
			default: {
				files: {
					"distribution/browser/URL.js": "source/URL.js"
				},

				options: {
					browserifyOptions: {
						standalone: "URL"
					}
				}
			}
		},

		connect: {
			options: {
				hostname: "*",
				base: ".",
				keepalive: true,
				port: 8080
			},

			development: {},

			test: {
				options: {
					keepalive: false,
					port: 8888
				}
			}
		},

		mocha: {
			test: {
				options: {
					urls: ["http://localhost:8888/test/framework/runner.html"]
				}
			}
		}
	});

	grunt.registerTask("server", ["connect:development"]);
	grunt.registerTask("test", ["connect:test", "mocha"]);

	var modules = [
		"grunt-contrib-connect",
		"grunt-mocha"
	];

	modules.forEach(function(module) {
		grunt.loadNpmTasks(module);
	});
};
