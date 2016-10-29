function expandImport(all, $1, $2) {
  return $1.split(',')
    .map(function(part) {
    	part = part.trim();
    	return 'var ' + part + ' = require("' + $2 + '").' + part + ';'
    })
    .join('');
}

function expandImport2(all, $1, $2, $3) {
  return 'const '+$1+' = require("'+$3+'");' + expandImport(all, $2, $3);
}

function starImportNotSupported(all, $1) {
	return 'console.error(\'import * is not supported:\', all);'
}

module.exports = function fakeImports (src) {
  src = src.replace(/import\s*([^{]*?)\s*from\s*'(.*?)'/g, 'const $1 = require("$2")');
  src = src.replace(/import\s*([^{]*?)\s*from\s*"(.*?)"/g, 'const $1 = require("$2")');
  src = src.replace(/import\s*"(.*?)"/g, 'require("$1")');
  src = src.replace(/import\s*'(.*?)'/g, 'require("$1")');
  src = src.replace(/import\s*\*\sfrom\s'(.*?)'/g, starImportNotSupported);
  src = src.replace(/import\s*\*\sfrom\s"(.*?)"/g, starImportNotSupported);
  src = src.replace(/import\s*{(.*?)}\s*from\s*"(.*?)"\s*/g, expandImport);
  src = src.replace(/import\s*{(.*?)}\s*from\s*'(.*?)'\s*/g, expandImport);
  src = src.replace(/import\s*([^{]*?)\s*,\s*{(.*?)}\s*from\s*"(.*?)"\s*/g, expandImport2);
  src = src.replace(/import\s*([^{]*?)\s*,\s*{(.*?)}\s*from\s*'(.*?)'\s*/g, expandImport2);

  src = src.replace(/export\s*default\s*([^ ]*)/g, 'module.exports = $1');
  src = src.replace(/export\s*(var|let|const)\s*([a-zA-Z0-9_$]*)/g, '$1 $2 = module.exports.$2');
  src = src.replace(/export\s*function\s*([a-zA-Z0-9_$]*)/g, 'var $1 = module.exports.$1 = function');
  src = src.replace(/export\s*class\s*([a-zA-Z0-9_$]*)/g, 'var $1 = module.exports.$1 = class');

  return src;
};