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