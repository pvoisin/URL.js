[![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

# URL.js

Simple URL implementation of [RFC #3986](http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax) for both NodeJS & browsers.

## Installation

### NPM

```npm install unified-resource-locator```

### Bower

```bower install unified-resource-locator```


## Usage

### In Short...

```javascript
var locator = new URL("http://localhost:1234/a/b/c/resource?X=1&Y&Z=3#page=1");

locator.protocol // "http"
locator.host // "localhost"
locator.port // 1234
locator.path // "/a/b/c/resource"
locator.query// {X: "1", Y: "", Z: "3"}
locator.fragment // "page=1"

String(new URL(locator, {query: {p: "San Francisco"}}))
// "https://search.yahoo.com/search?p=San%20Francisco"

String(new URL(locator, {path: "/search/images"}, true))
// "https://search.yahoo.com/search/images?p=New%20York"

String(new URL(locator, {query: null}, true))
// "https://search.yahoo.com/search"
```


## API

### Constructor (`URL`)

URL objects can be constructed from raw locators, like:

```javascript
new URL("http://foo.bar-baz.com:80/p/a/t/h?q=u&e&r=y#fragment");
new URL("/p/a/t/h?q=u&e&r=y#fragment");
new URL("https://engine/search/?q=Earth");
new URL("http://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard");
new URL("//en.wikipedia.org/wiki/URI_scheme#Generic_syntax");
new URL("redis://undefined:password@localhost:6379/0");
new URL("http://mickey@disney.com/#/house");
```

Also, you can complement the locators with specific parts if missing or completely overwrite some of them:

```javascript
new URL("https://engine/search", {query: "q=Earth"});
new URL("https://engine/search", {query: {q: "Solar System"}});
new URL("https://engine/search/?q=Earth", {query: {q: "Moon"}}, true);
```

Finally, full control of URL parts is possible by providing them to the constructor without any text locator.

```javascript
new URL({protocol: "http", "host": "server"});
new URL({host: "server"});
new URL({path: "/from/root"});
new URL({query: "A=1"});
```

### Pattern (`URL.pattern`)

[Pattern](source/URL.js#L106) based on [RFC 3986](http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax).

### Supported Parts (`URL.parts`)

- `protocol`
- `user`
- `password`
- `host`
- `port`
- `path`
- `query`
- `fragment`

### `URL#parseQueryString` `(string)`

Guess what!..

### `URL#makeQueryString` `(object)`

Yes, you can!


### More?

Have a look at the [test suite](test/suites/URLSuite.js#L5)! ;)

## Workflow

- `npm test` for running tests;
- `test/coverage.sh` for measuring code coverage.


[npm-image]: https://img.shields.io/npm/v/unified-resource-locator.svg?style=flat
[npm-url]: https://www.npmjs.com/package/unified-resource-locator
[travis-image]: https://img.shields.io/travis/pvoisin/URL.js.svg?branch=master
[travis-url]: https://travis-ci.org/pvoisin/URL.js/
[coveralls-image]: https://coveralls.io/repos/pvoisin/URL.js/badge.svg?branch=master&service=github
[coveralls-url]: https://coveralls.io/github/pvoisin/URL.js?branch=master