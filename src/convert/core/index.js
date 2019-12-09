const path = require('path');
const template = require('./template');
const fs = require('fs');

function convert(fileHash, inputPath, outputPath) {
  const app = fileHash.app;
  emitApp(app);

  function pathConvert(filePath) {
    return path.join(outputPath, path.relative(inputPath, filePath))
  }

  function relativePath(filePath) {
    return path.relative(inputPath, filePath);
  }

  function emitApp(app) {
    const pagePaths = app.components.map(component => {
      return {
        path: `/${relativePath(component)}`,
        component: `./${relativePath(component)}`
      }
    })
    const appContent = template.buildApp(pagePaths);

    const filePath = app.js;
    fs.writeFileSync(pathConvert(filePath), appContent);
  }

  function emitComponent(filePath, content) {
    fs.writeFileSync(pathConvert(filePath), content);
  }
}
module.exports = convert;
