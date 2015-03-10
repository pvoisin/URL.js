var URL = require("../../source/URL.js");
var expect = require("expect.js");

describe("URL", function() {
	var candidates = {
		valid: [
			"http://foo.bar-baz.com:80/p/a/t/h?q=u&e&r=y#fragment",
			"http://host:80/p/a/t/h?q=u&e&r=y#fragment",
			"//p/a/t/h?q=u&e&r=y#fragment",
			"https://host/p/a/t/h/?q=Earth",
			"http://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard",
			"//en.wikipedia.org/wiki/URI_scheme#Generic_syntax"
		],
		invalid: [
			"://host:80/p/a/t/h?q=u&e&r=y#fragment",
			"http://:port/p/a/t/h?q=u&e&r=y#fragment"
		]
	};

	it("should respect basic generic syntax of RFC 3986", function() {
		candidates["valid"].forEach(function(candidate) {
			expect(function() {
				new URL(candidate);
			}).not.to.throwError(function(error) { console.error(error.stack); });
		});

		candidates["invalid"].forEach(function(candidate) {
			expect(function() {
				new URL(candidate);
			}).to.throwError();
		});
	});

	it("should be the same as what's provided to the constructor when not overridden nor completed", function() {
		var locator = "file://localhost:1234/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1";
		expect(String(new URL(locator))).to.be(locator);
	});

	it("could be completed with options", function() {
		var locator = "/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1";

		expect(String(new URL(locator, {protocol: "http"}))).to.be("/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1");
		expect(String(new URL(locator, {host: "candy.com"}))).to.be("http://candy.com/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1");
		expect(String(new URL(locator, {
			protocol: "https",
			host: "candy.com"
		}))).to.be("https://candy.com/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1");
		expect(String(new URL(locator, {query: {user: "Mickey"}}))).to.eql("/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre&user=Mickey#items?page=1");
	});

	it("could be overridden by options", function() {
		var locator = "file://localhost:1234/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1";

		expect(String(new URL(locator, {protocol: null}, true))).to.be("http://localhost:1234/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1");
		expect(String(new URL(locator, {host: null}, true))).to.be("/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1");
		expect(String(new URL(locator, {port: null}, true))).to.be("file://localhost/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1");
		expect(String(new URL(locator, {path: null}, true))).to.eql("file://localhost:1234/?X=1&Y&Z=3&odd=bizarre#items?page=1");
		expect(String(new URL(locator, {query: null}, true))).to.be("file://localhost:1234/abc/def/ghi.xyz#items?page=1");
		expect(String(new URL(locator, {query: {user: "Mickey"}}, true))).to.be("file://localhost:1234/abc/def/ghi.xyz?user=Mickey#items?page=1");
		expect(String(new URL(locator, {fragment: null}, true))).to.be("file://localhost:1234/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre");

		expect(String(new URL(locator, {
			query: null,
			fragment: null
		}, true))).to.be("file://localhost:1234/abc/def/ghi.xyz");
	});

	it("should allow query manipulation", function() {
		expect(new URL("/thing").query).to.eql({});

		var locator = new URL("file://localhost:1234/abc/def/ghi.xyz?X=1&Y&Z=3&odd=bizarre#items?page=1");

		expect(locator.query).to.eql({X: "1", Y: "", Z: "3", odd: "bizarre"});

		var query = locator.query;

		delete query["Y"];
		expect(locator.query).to.eql({X: "1", Z: "3", odd: "bizarre"});

		query["user"] = "Mickey";
		expect(locator.query).to.eql({X: "1", Z: "3", odd: "bizarre", user: "Mickey"});
	});

	it("should provide access to common parts", function() {
		var locator = new URL("file://localhost:1234/abc/def/ghi.xyz?user=Mickey#items?page=1");

		expect(locator.protocol).to.be("file");
		expect(locator.host).to.be("localhost");
		expect(locator.port).to.be(1234);
		expect(locator.path).to.be("/abc/def/ghi.xyz");
		expect(locator.query).to.eql({user: "Mickey"});
		expect(locator.fragment).to.be("items?page=1");
	});
});