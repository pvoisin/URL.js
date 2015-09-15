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

		mochaTest: {
			test: {
				options: {
					reporter: "spec"
				},

				src: ["test/suites/**/*Suite.js"]
			}
		}
	});

	grunt.registerTask("test", ["mochaTest"]);

	var modules = [
		"grunt-browserify",
		"grunt-mocha-test"
	];

	modules.forEach(function(module) {
		grunt.loadNpmTasks(module);
	});
};
