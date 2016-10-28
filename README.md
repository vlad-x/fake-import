# fake-import

Inspired by https://www.npmjs.com/package/import-export

Replaces es6 import/export with NodeJS require/module.exports


```
var fakeImports = require('fake-import');

console.log(fakeImport('import React from "React"')); // const React = require("React")

```