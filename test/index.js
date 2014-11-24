var it             = require('tape'),
    fs             = require('fs'),
    path           = require('path'),
    Remarkable     = require('remarkable');
    meta           = require('..');

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf8');
}

it('should parse metadata', function(t) {
  var mdText = fixture('test.md');
  var md = new Remarkable();
  md.use(meta);
  var html = md.render(mdText);
  var expectedHtml = [
    '<h1>My document</h1>',
    '<h2>Second heading</h2>',
    '<p>This is awesome.</p>',
    '<ul>',
    '<li>a point</li>',
    '<li>another point</li>',
    '</ul>',
    ''
  ].join('\n');
  t.deepEquals(md.meta, { My: 'Word', Author: 'Eugene', Stuff: [ 'My', 'Stuff' ] });
  t.equals(expectedHtml, html);
  t.end();
});

it('should handle empty meta data', function(t) {
  var mdText = fixture('empty.md');
  var md = new Remarkable();
  md.use(meta);
  var html = md.render(mdText);
  var expectedHtml = [
    '<h1>My document</h1>',
    '<h2>Second heading</h2>',
    '<p>This is awesome.</p>',
    '<ul>',
    '<li>a point</li>',
    '<li>another point</li>',
    '</ul>',
    ''
  ].join('\n');
  t.deepEquals(md.meta, {});
  t.equals(expectedHtml, html);
  t.end();
});

it('should handle missing meta data', function(t) {
  var mdText = fixture('missing.md');
  var md = new Remarkable();
  md.use(meta);
  var html = md.render(mdText);
  var expectedHtml = [
    '<h1>My document</h1>',
    '<h2>Second heading</h2>',
    '<p>This is awesome.</p>',
    '<ul>',
    '<li>a point</li>',
    '<li>another point</li>',
    '</ul>',
    ''
  ].join('\n');
  t.deepEquals(md.meta, {});
  t.equals(expectedHtml, html);
  t.end();
});

it('should handle misplaced meta data', function(t) {
  var mdText = fixture('misplaced.md');
  var md = new Remarkable();
  md.use(meta);
  var html = md.render(mdText);
  var expectedHtml = [
    '<h1>My document</h1>',
    '<h2>Second heading</h2>',
    '<p>This is awesome.</p>',
    '<ul>',
    '<li>a point</li>',
    '<li>another point</li>',
    '</ul>',
    '<hr>',
    '<p>My: Word',
    'Author: Eugene',
    'Stuff:</p>',
    '<ul>',
    '<li>My</li>',
    '<li>Stuff</li>',
    '</ul>',
    '<hr>',
    ''
  ].join('\n');
  t.deepEquals(md.meta, {});
  t.equals(expectedHtml, html);
  t.end();
});

it('should only parse metadata at the top of the file', function(t) {
  var mdText = fixture('notfirst.md');
  var md = new Remarkable();
  md.use(meta);
  var html = md.render(mdText);
  var expectedHtml = [
    '<hr>',
    '<p>My: Word',
    'Author: Eugene',
    'Stuff:</p>',
    '<ul>',
    '<li>My</li>',
    '<li>Stuff</li>',
    '</ul>',
    '<hr>',
    '<h1>My document</h1>',
    '<h2>Second heading</h2>',
    '<p>This is awesome.</p>',
    '<ul>',
    '<li>a point</li>',
    '<li>another point</li>',
    '</ul>',
    ''
  ].join('\n');
  t.deepEquals(md.meta, {});
  t.equals(expectedHtml, html);
  t.end();
});
