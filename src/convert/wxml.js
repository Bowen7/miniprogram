const h = require('./helper');
const t = require('./template');
const path = require('path');
module.exports = function(source) {
  const { resourcePath, rootContext, context } = this;
  const json = JSON.parse(h.convertFile(resourcePath, 'json'));
  const { usingComponents = {} } = json;
  const components = h.convertUsingComponents.call(this, usingComponents);
  const script = h.convertFile(resourcePath, 'script');
  const template = h.convertFile(resourcePath, 'template');
  const style = h.convertFile(resourcePath, 'style');
  return t.buildComponent(template, script, style, components);
};
