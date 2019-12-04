const fs = require("fs");
const path = require('path')
const h = {};
h.fileExist = (path) => {
  try {
    fs.accessSync(path, fs.constants.R_OK);
    return true;
  } catch (err) {
    return false;
  }
}
h.getFiles = (curPath, rootPath, isApp = false) => {
  const wxmlPath = curPath + '.wxml';
  const wxssPath = curPath + '.wxss';
  const jsonPath = curPath + '.json';
  const jsPath = curPath + '.js';
  // json和js必须存在 
  // wxml除app必须存在 
  // wxss可不存在
  if (!h.fileExist(wxmlPath) && !isApp) {
    console.error(`${wxmlPath} not exist`);
  }
  if (!h.fileExist(jsonPath)) {
    console.error(`${jsonPath} not exist`);
  }
  if (!h.fileExist(jsPath)) {
    console.error(`${jsPath} not exist`);
  }
  const files = {
    json: jsonPath,
    js: jsPath,
  };
  if (h.fileExist(wxmlPath)) {
    files.wxml = wxmlPath;
  }
  if (h.fileExist(wxssPath)) {
    files.wxss = wxssPath;
  }
  let jsonContent = {}
  try {
    jsonContent = JSON.parse(fs.readFileSync(jsonPath));
  } catch (error) {
    console.error(`${jsonPath}: json parse error`);
  }
  const components = [];
  if (isApp) {
    jsonContent.pages && jsonContent.pages.forEach(item => {
      if (path.isAbsolute(item)) {
        components.push(path.join(rootPath, item));
      } else {
        components.push(path.join(path.dirname(curPath), item));
      }
    });
  } else {
    const usingComponents = jsonContent.usingComponents;
    if (usingComponents) {
      for (let key in usingComponents) {
        const comPath = usingComponents[key];
        if (path.isAbsolute(comPath)) {
          components.push(path.join(rootPath, comPath));
        } else {
          components.push(path.join(path.dirname(curPath), comPath));
        }
      }
    }
  }
  files.components = components;
  return files;
}
h.getFileHash = (rootPath) => {
  const fileHash = {
    app: {},
    pages: {},
    components: {}
  };
  const stack = [path.join(rootPath, './app')];
  let isApp = true;
  while (stack.length > 0) {
    const cur = stack.pop();
    if (fileHash[cur]) {
      continue;
    }
    const files = h.getFiles(cur, rootPath, isApp);
    if (isApp) {
      fileHash.app = files;
      isApp = false;
    } else if (~fileHash.app.components.indexOf(cur)) {
      fileHash.pages[cur] = files;
    } else {
      fileHash.components[cur] = files;
    }
    stack.push(...files.components);
  }
  return fileHash;
}
module.exports = h;