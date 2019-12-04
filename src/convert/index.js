const parser = require("@babel/parser");
const generate = require("@babel/generator")["default"];
const traverse = require("@babel/traverse")["default"];
const t = require("@babel/types");
const path = require("path");
const fs = require('fs');
const helper = require("./helper")
const cwd = process.cwd();
const inputPath = path.join(cwd, "./input");
const outputPath = path.join(cwd, "./output");
const fileHash = helper.getFileHash(inputPath);
console.log(fileHash);
// const ast = parser.parse(source, {
//   sourceType: "module"
// });
// traverse(ast, {
//   ExportDefaultDeclaration(rootPath) {
//     let declarationPath = rootPath.get("declaration");
//     if (t.isObjectExpression(declarationPath)) {
//       const code = generate(declarationPath.node).code;
//       json = eval("(" + code + ")");
//     }
//   }
// });