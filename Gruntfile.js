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
		}
	});

	var modules = [
		"grunt-browserify"
	];

	modules.forEach(function(module) {
		grunt.loadNpmTasks(module);
	});
};
