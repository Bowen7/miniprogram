const parser = require("@babel/parser");
const generate = require("@babel/generator")["default"];
const traverse = require("@babel/traverse")["default"];
const t = require("@babel/types");
// const source = `Page({
//   data: {
//   },
//   properties: {
//     myProperty: {
//       type: String,
//       value: ''
//     },
//     myProperty2: String // 简化的定义方式
//   },
//   bindBtnTap: function () {
//     wx.navigateTo({
//       url: '/pages/logs/logs',
//     })
//   },
//   onLoad: function () {
//   }
// })
// `;
const pageHooksHash = {
  onLoad: "created",
  onReady: "mounted",
  onUnload: "destroyed"
};
const componentHooksHash = {
  created: "created",
  attached: "beforeMount",
  ready: "mounted",
  detached: "destroyed"
};

function convertData(options) {
  return options.filter(option => {
    return option.key.name === 'data';
  })
}

function convertMethods(options, isPage) {
  if (isPage) {
    const methodProps = options.filter(option => {
      const key = option.key.name;
      return !(pageHooksHash[key] || key === 'data' || key === 'properties');
    });
    const objEx = t.objectExpression(methodProps)
    return [t.objectProperty(t.identifier('methods'), objEx)];
  } else {
    return options.filter(option => {
      return option.key.name === 'methods';
    })
  }
}

function convertHooks(options, isPage) {
  const hooksHash = isPage ? pageHooksHash : componentHooksHash;
  return options.filter(option => {
    const key = option.key.name;
    if (hooksHash[key]) {
      option.key.name = hooksHash[key];
      return true;
    }
    return false;
  })
}

function convertProps(options) {
  return options.filter(option => {
    const key = option.key.name;
    if (key === 'properties') {
      option.key.name = 'props';
      const optionVal = option.value;
      const properties = optionVal.properties;
      properties.forEach(prop => {
        const propVal = prop.value;
        if (t.isObjectExpression(propVal)) {
          propVal.properties.forEach(item => {
            if (item.key.name === 'value') {
              item.key.name = 'default';
            }
          })
        }
      })
      return true;
    }
    return false;
  })
}

function convertOptions(options, isPage = false) {
  const data = convertData(options);
  const methods = convertMethods(options, isPage);
  const hooks = convertHooks(options, isPage);
  const props = convertProps(options);
  return [...data, ...hooks, ...methods, ...props];
}

function convertJs(source) {
  const ast = parser.parse(source, {
    sourceType: "module"
  });
  traverse(ast, {
    CallExpression(callPath) {
      const callee = callPath.get("callee");
      const name = callee.node.name;
      if (name !== "Page" && name !== "Component") {
        return;
      }
      const calleeArgs = callPath.get("arguments");
      if (calleeArgs && calleeArgs.length) {
        const calleeArg = calleeArgs[0];
        if (t.isObjectExpression(calleeArg)) {
          const properties = calleeArg.node.properties;
          const options = convertOptions(properties, name === "Page");
          const objEx = t.objectExpression(options);
          const exportDefaultDc = t.exportDefaultDeclaration(objEx)
          callPath.parentPath.replaceWith(
            exportDefaultDc
          );
        }
      }
    }
  });
  return generate(ast).code;
}
module.exports = convertJs;