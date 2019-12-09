const path = require('path');
const fs = require('fs');
const entryFile = 'app.js';
const h = require('./helper');
module.exports = function(source) {
  const { resourcePath } = this;
  if (path.basename(resourcePath) !== entryFile) {
    return source;
  }
  const jsonPath = h.convertPath(resourcePath, 'json');
  h.getPages(jsonPath);
  // console.log(path.join(path.dirname(jsonPath), 'page/abc'));
  return 'console.log(123);';
};
