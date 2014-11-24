# remarkable-meta

Add YAML metadata to the remarkable pluggable markdown parser

[![build status](https://secure.travis-ci.org/eugeneware/remarkable-meta.png)](http://travis-ci.org/eugeneware/remarkable-meta)

Based on code by [Alex Kocharin](https://github.com/rlidwka) from [this mailing
list post](https://groups.google.com/forum/#!topic/nodejs/dV6PW3JpYVM).

## Installation

This module is installed via npm:

``` bash
$ npm install remarkable-meta
```

## Example Usage

Given the following markdown file `test.md` with YAML meta data delimited by
`---` placed at the very top of the markdown file:

```
---
My: Word
Author: Eugene
Stuff:
  - My
  - Stuff
---

# My document

## Second heading

This is awesome.

* a point
* another point
```

The YAML front-matter metadata will be available on the markdown object after
parsing when you add the `remarkable-meta` plugin:

``` js
var meta = require('remarkable-meta');
var md = new Remarkable();
md.use(meta);

// Load the file listed above
var file = fs.readFileSync('./test.md', 'uf8');

var html = md.render(mdText);
console.log(md.meta);
// { My: 'Word', Author: 'Eugene', Stuff: [ 'My', 'Stuff' ] }
```
