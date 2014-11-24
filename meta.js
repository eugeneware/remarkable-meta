var YAML = require('js-yaml')

module.exports = function (md) {
  return meta.bind(null, md);
}

function get(state, line) {
  var pos = state.bMarks[line]
  var max = state.eMarks[line]
  return state.src.substr(pos, max - pos)
}

function meta(md, state, start, end, silent) {
  if (start !== 0 || state.blkIndent !== 0) return false
  if (state.tShift[start] < 0) return false
  if (!get(state, start).match(/^---$/)) return false

  var data = []
  for (var line = start + 1; line < end; line++) {
    var str = get(state, line)
    if (str.match(/^---$/)) break
    if (state.tShift[line] < 0) break
    data.push(str)
  }

  if (line >= end) return false

  md.meta = YAML.safeLoad(data.join('\n')) || {};

  state.line = line + 1
  return true
}
