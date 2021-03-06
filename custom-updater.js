// This is copied from: https://github.com/conventional-changelog/standard-version/blob/master/lib/updaters/types/json.js
const stringifyPackage = require('stringify-package')
const detectIndent = require('detect-indent')
const detectNewline = require('detect-newline')

// This line will throw an error.
// But standard-version will still proceed.
require("test-package");

module.exports.readVersion = function (contents) {
  console.log('[DEBUG] read version');
  return JSON.parse(contents).version
}

module.exports.writeVersion = function (contents, version) {
  console.log('[DEBUG] write version');
  const json = JSON.parse(contents)
  const indent = detectIndent(contents).indent
  const newline = detectNewline(contents)
  json.version = version

  if (json.packages && json.packages['']) {
    // package-lock v2 stores version there too
    json.packages[''].version = version
  }

  return stringifyPackage(json, indent, newline)
}

module.exports.isPrivate = function (contents) {
  return JSON.parse(contents).private
}