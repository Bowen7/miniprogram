const parser = require("@babel/parser");
const generate = require("@babel/generator")["default"];
const traverse = require("@babel/traverse")["default"];
const t = require("@babel/types");
const source = `Page({
  data: {
  },
  bindBtnTap: function () {
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  },
  onLoad: function () {
  }
})
`;
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
function convertData(data) {}
function convertMethods(methods) {}
function convertHooks(hooks) {}
function convertOptions(options, isPage = false) {}
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
					const properties = calleeArg.get("properties");
					const options = convertOptions(properties, name === "Page");
					// console.log(properties.length);
				}
			}
		}
	});
	const code = generate(ast).code;
	console.log(code);
}
convertJs(source);
