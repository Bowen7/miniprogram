const path = require('path');
const fs = require('fs');
const h = require('./helper');
const template = require('./template');

const entryFile = 'app.js';

module.exports = function(source) {
  const { resourcePath } = this;
  if (path.basename(resourcePath) !== entryFile) {
    return source;
  }

  const jsonContent = h.convertFile(resourcePath, 'json');
  const pagesString = h.getPagesString(jsonContent);
  const app = template.buildApp(pagesString);
  return app;
};
