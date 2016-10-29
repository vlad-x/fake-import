var fakeImport = require('./')
var test = require('tape')

test('test imports', function (t) {
  t.plan(8);
  t.ok(fakeImport('import React from \'React\'') == 'const React = require("React")');
  t.ok(fakeImport('import React from "React"') == 'const React = require("React")');

  t.ok(fakeImport('import\t\'React\'') == 'require("React")');
  t.ok(fakeImport('import\n\t\n"React"') == 'require("React")');

  t.ok(fakeImport('import {h1, p} from \'React\'') == 'var h1 = require("React").h1;var p = require("React").p;');
  t.ok(fakeImport('import   {\th1,\t\tp  } from "React"') == 'var h1 = require("React").h1;var p = require("React").p;');


  t.ok(fakeImport('import React, {h1, p} from \'React\'') == 'const React = require("React");var h1 = require("React").h1;var p = require("React").p;');
  t.ok(fakeImport('import React  ,   {\th1,\t\tp  } from "React"') == 'const React = require("React");var h1 = require("React").h1;var p = require("React").p;');

})

test('test exports', function (t) {
  t.plan(6);

  t.ok(fakeImport('export default MyVar') == 'module.exports = MyVar');
  t.ok(fakeImport('export var MyVar') == 'var MyVar = module.exports.MyVar');
  t.ok(fakeImport('export let MyVar') == 'let MyVar = module.exports.MyVar');
  t.ok(fakeImport('export const MyVar') == 'const MyVar = module.exports.MyVar');
  t.ok(fakeImport('export function MyVar') == 'var MyVar = module.exports.MyVar = function');
  t.ok(fakeImport('export class MyVar') == 'var MyVar = module.exports.MyVar = class');
})
