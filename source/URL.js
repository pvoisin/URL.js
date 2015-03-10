var merge = require("./utility").merge;

function URL(locator, options, override) {
	var self = this;

	locator = String(locator || "").trim();

	if(!locator) {
		throw new Error("Invalid locator:", locator);
	}

	options = merge({/* default */}, options);

	URL.parts.forEach(function(part) {
		self[part] = undefined;
	});

	self.query = {};

	var capture = URL.pattern.exec(locator);

	if(!capture) {
		throw new Error("Invalid URL: " + locator);
	}

	capture = capture.slice(1);

	URL.parts.forEach(function(part, index) {
		var value = override && (part in options) ? options[part] : capture[index] || options[part];
		if(value !== undefined) {
			self[part] = (part === "port") ? Number(value) : value;
		}
	});

	if(typeof self.query === "string") {
		self.query = URL.parseQueryString(self.query);
	}

	if("query" in options) {
		var query = (typeof options.query === "string") ? URL.parseQueryString(options.query) : options.query;
		self.query = override ? options.query : merge({}, self.query, query);
	}
}

URL.prototype.toString = function() {
	var self = this;

	var result = "";

	if(self.host) {
		result += (self.protocol || "http") + "://" + self.host;
		if(self.port && self.port !== 80) {
			result += ":" + self.port;
		}
	}

	result += self.path || (self.query || self.fragment) && "/" || "";

	if(self.query) {
		var queryString = URL.makeQueryString(self.query);
		if(queryString) {
			result += "?" + queryString;
		}
	}

	if(self.fragment) {
		result += "#" + self.fragment;
	}

	return result;
};

// Based on RFC 3986 (http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax).
URL.pattern = /^(?:(?:(\w+):)?\/\/([.\-\w]+)(?::(\d+))?)?(?:(\/[^\?#]*)(?:\?([^#]+))?(?:#(.+))?)?$/;

URL.parts = ["protocol", "host", "port", "path", "query", "fragment"];

URL.parseQueryString = function(queryString) {
	var query = {}, capture, pattern = /([^&=]+)=?([^&]*)/g;

	// Here we need to use the same pattern instance for every iterations, otherwise it will be infinite.
	while(queryString && (capture = pattern.exec(queryString))) { // assignment
		query[decode(capture[1])] = decode(capture[2]);
	}

	// Decode URI components and replaces "+" occurrences with spaces.
	function decode(string) {
		return decodeURIComponent(string.replace(/\+/g, " "));
	}

	return query;
};

URL.makeQueryString = function(query) {
	var pairs = [];
	for(var parameter in query) {
		if(query.hasOwnProperty(parameter)) {
			var value = query[parameter];
			pairs.push(encodeURIComponent(parameter) + (value ? "=" + encodeURIComponent(value) : ""));
		}
	}

	return pairs.join("&");
};


module.exports = URL;