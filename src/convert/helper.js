const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const generate = require('@babel/generator')['default'];
const traverse = require('@babel/traverse')['default'];
const t = require('@babel/types');
const h = {};
h.convertPath = (filePath, type) => {
  const pathObj = path.parse(filePath);
  switch (type) {
    case 'template':
      pathObj.ext = '.wxml';
      break;
    case 'style':
      pathObj.ext = '.wxss';
      break;
    case 'script':
      pathObj.ext = '.js';
      break;
    case 'json':
      pathObj.ext = '.json';
      break;
    default:
      break;
  }
  pathObj.base = '';
  return path.format(pathObj);
};
h.convertFile = (filePath, type) => {
  filePath = h.convertPath(filePath, type);
  return fs.readFileSync(filePath).toString();
};
h.getPagesString = content => {
  console.log(content);
  content = JSON.parse(content);
  const pages = content.pages || [];
  let requires = '';
  let routes = '';
  pages.forEach((page, index) => {
    const pageName = `__Page__${index}__`;
    requires += `import ${pageName} from './${page}.wxml';\n`;
    if (index === 0) {
      routes += `{ path: "/", redirect: '/${page}' },\n`;
    }
    routes += `{ path: "/${page}", component: ${pageName} },\n`;
  });
  return `${requires}\nconst routes=[${routes}]`;
};
h.convertJs = content => {
  const ast = parser.parse(content, {
    sourceType: 'module'
  });
  let _callPath;
  traverse(ast, {
    CallExpression(callPath) {
      const callee = callPath.get('callee');
      const name = callee.node.name;
      if (name === 'Page' || name === 'Component') {
        _callPath = callPath;
      }
    }
  });
  if (_callPath) {
    const exportDefaultDc = t.exportDefaultDeclaration(_callPath.node);
    _callPath.parentPath.replaceWith(exportDefaultDc);
  }
  return generate(ast).code;
};
module.exports = h;
