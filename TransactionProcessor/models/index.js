const fs = require('fs'),
  path = require('path'),
  submodules = {},
  _ = require('lodash');

// returns { ModelX: object, ModelY: object, ... }
fs.readdirSync(__dirname).forEach(file => {
  if (file.indexOf('index.js') > -1) return;
  const exportName = _.startCase(path.basename(file, '.js')).replace(/\s/, '');
  submodules[exportName] = require(path.join(__dirname, file));
});

module.exports = submodules;
