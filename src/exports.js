"use strict"

const libs = [
  'xhr'
];

const exporter = {}

const modules = libs.map(lib => require(`./${lib}`));
modules.forEach(module => {
  Object.keys(module).forEach(key => {
    exporter[key] = module[key];
  })
});

module.exports = exporter;
