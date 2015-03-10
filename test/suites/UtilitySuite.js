var merge = require("../../source/utility").merge;
var expect = require("expect.js");

describe("merge", function() {
	it("should deal with objects properly", function() {
		// Shallow merge:
		var object = {A: 1, C: "3"};
		var result = merge(object, {B: 2});
		expect(result).to.be(object);
		expect(result).to.eql({A: 1, B: 2, C: 3});

		// Deep merge:
		var now = Date.now();
		var object = {A: 1, C: "3", Q: {X: true, Y: now, Z: undefined}};
		var result = merge(object, {B: 2, Q: {W: null}});
		expect(result).to.be(object);
		expect(result).to.eql({A: 1, B: 2, C: 3, Q: {W: null, X: true, Y: now, Z: undefined}});
	});

	it("should deal with arrays properly", function() {
		var object = ["red", "green", "blue"];
		var result = merge(object, ["yellow", "cyan", "magenta", "red", undefined, "green", null, "blue", -1]);
		expect(result).to.be(object);
		expect(result).to.eql(["red", "green", "blue", "yellow", "cyan", "magenta", undefined, null, -1]);

		var object = {A: 1, C: "3", O: [111, 222, 333]};
		var result = merge(object, {B: 2}, {O: [444, Infinity]});
		expect(result).to.be(object);
		expect(result).to.eql({A: 1, B: 2, C: 3, O: [111, 222, 333, 444, Infinity]});
	});
});