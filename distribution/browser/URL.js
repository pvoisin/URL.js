(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.URL = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var helper = require("./helper");


function URL(locator, options, overwrite) {
	var self = this, own = self;

	if(typeof locator === "string") {
		locator = String(locator || "").trim();

		if(!locator) {
			throw new Error("Invalid locator:", locator);
		}

		options = helper.merge({/* ∅ */}, options);

		var capture = URL.pattern.exec(locator);

		if(!capture) {
			throw new Error("Invalid URL: " + locator);
		}

		capture = capture.slice(1);

		URL.parts.forEach(function(part, index) {
			var value = overwrite && (part in options) ? options[part] : capture[index] || options[part];
			if(value !== undefined) {
				own[part] = value;
			}
		});

		if(typeof own.query === "string") {
			own.query = URL.parseQueryString(own.query);
		}

		// If not overriding, let's complete the query parameters:
		if(!overwrite && own.query !== options.query) {
			if(typeof options.query === "string") {
				options.query = URL.parseQueryString(options.query);
			}
			own.query = helper.merge({}, own.query, options.query);
		}
	}
	else {
		options = locator;

		if(options.protocol && !options.host
			|| options.port && !options.host
			|| options.user && !options.host
			|| options.password && !options.user) {
			throw new Error("Missing URL parts: " + JSON.stringify(options));
		}

		URL.parts.forEach(function(part, index) {
			if(part in options) {
				own[part] = options[part] && String(options[part]);
			}
		});

		if(typeof own.query === "string") {
			own.query = URL.parseQueryString(own.query);
		}
	}

	own.path = own.path || "/";

	if(own.port !== undefined && typeof own.port !== "number") {
		own.port = Number(own.port);
	}
}

URL.prototype.toString = function() {
	var self = this, own = self;

	var result = "";

	if(own.host) {
		own.protocol && (result += own.protocol + ":");
		result += "//";
		if(own.user) {
			result += own.user;
			if(own.password) {
				result += ":" + own.password;
			}
			result += "@"
		}
		result += own.host;
		if(own.port && own.port !== 80) {
			result += ":" + own.port;
		}
	}

	result += own.path;

	if(own.query) {
		result += "?" + URL.makeQueryString(own.query);
	}

	if(own.fragment) {
		result += "#" + own.fragment;
	}

	return result;
};

// Cf. [RFC 3986](http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax)
URL.pattern = /^(?:(?:(\w+):)?\/\/(?:(\w+)(?::(\w+))?@)?([.\-\w]+)(?::(\d+))?)?(?:(\/[^\?#]*)(?:\?([^#]+))?(?:#(.+))?)?$/;

URL.parts = ["protocol", "user", "password", "host", "port", "path", "query", "fragment"];

URL.parseQueryString = function(queryString) {
	var query = {}, capture;
	var pattern = /([^&=]+)=?([^&]*)/g;

	// Here we need to use the same pattern instance for every iterations, otherwise it won't stop...
	while(queryString && (capture = pattern.exec(queryString))) { // assignment
		query[decode(capture[1])] = decode(capture[2]) || undefined;
	}

	// Decode URI components and replace "+" occurrences with spaces.
	function decode(string) {
		return decodeURIComponent(string.replace(/\+/g, " "));
	}

	return query;
};

URL.makeQueryString = function(query) {
	var pairs = [];
	for(var parameter in query) {
		var value = query[parameter];
		pairs.push(encodeURIComponent(parameter) + (value ? "=" + encodeURIComponent(value) : ""));
	}

	return pairs.join("&");
};


module.exports = URL;
},{"./helper":2}],2:[function(require,module,exports){
function merge(object/*, source, ...*/) {
	Array.prototype.slice.call(arguments, 1).forEach(function(source) {
		if(Array.isArray(object) && Array.isArray(source)) {
			source.forEach(function(value) {
				if(!~object.indexOf(value)) {
					object.push(value);
				}
			});
		}
		else {
			for(var property in source) {
				if(source.hasOwnProperty(property)) {
					if(isObject(object[property]) && isObject(source[property])) {
						object[property] = merge(object[property], source[property]);
					}
					else {
						object[property] = source[property];
					}
				}
			}
		}
	});

	return object;
}

function isObject(value) {
	return value && typeof value === "object";
}

module.exports = {
	merge: merge,
	isObject: isObject
};
},{}]},{},[1])(1)
});