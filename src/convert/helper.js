const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const generate = require('@babel/generator')['default']
const traverse = require('@babel/traverse')['default']
const t = require('@babel/types')
const { entryPath } = require('../../config')
const h = {}
h.convertPath = (filePath, type) => {
  const pathObj = path.parse(filePath)
  switch (type) {
    case 'template':
      pathObj.ext = '.wxml'
      break
    case 'style':
      pathObj.ext = '.wxss'
      break
    case 'script':
      pathObj.ext = '.js'
      break
    case 'json':
      pathObj.ext = '.json'
      break
    default:
      break
  }
  pathObj.base = ''
  return path.format(pathObj)
}
h.convertFile = (filePath, type) => {
  try {
    filePath = h.convertPath(filePath, type)
    return fs.readFileSync(filePath).toString()
  } catch (error) {
    return ''
  }
}
h.getPagesString = (content, env = 'web') => {
  content = JSON.parse(content)
  const pages = content.pages || []
  let requires = ''
  let routes = ''
  pages.forEach((page, index) => {
    const pageName = `__Page__${index}__`

    requires += `import ${pageName} from './${page}.wxml?env=${env}';\n`
    if (index === 0) {
      routes += `"/": { redirect: '/${page}' },\n`
    }
    routes += `"/${page}": { component: ${pageName} },\n`
  })
  return `${requires}\nconst routes={${routes}}`
}
h.convertJs = (content, components, env = 'web') => {
  const componentsProperties = []
  let headCode = ''
  components.forEach((component, index) => {
    const { name, comPath } = component
    const componentAliasName = `__Component__${index}__`
    headCode += `import ${componentAliasName} from '${comPath}.wxml?env=${env}';\n`
    componentsProperties.push(
      t.objectProperty(t.identifier(name), t.identifier(componentAliasName))
    )
  })

  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  let _callPath
  traverse(ast, {
    CallExpression(callPath) {
      const callee = callPath.get('callee')
      const name = callee.node.name
      if (name === 'Page' || name === 'Component') {
        const args = callPath.get('arguments')
        if (args.length > 0) {
          const props = args[0].node.properties
          const componentsProp = t.objectProperty(
            t.identifier('components'),
            t.objectExpression(componentsProperties)
          )
          env === 'worker'
            ? props.unshift(componentsProp)
            : (args[0].node.properties = [componentsProp])
        }
        _callPath = callPath
      }
    }
  })
  if (_callPath) {
    const exportDefaultDc = t.exportDefaultDeclaration(_callPath.node)
    if (env === 'web') {
      return headCode + generate(exportDefaultDc).code
    }
    _callPath.parentPath.replaceWith(exportDefaultDc)
  }

  return headCode + generate(ast).code
}
// 要绑定this使用
h.convertUsingComponents = function(usingComponents) {
  const { rootContext, context } = this
  const components = []
  for (let name in usingComponents) {
    let comPath = usingComponents[name]
    if (path.isAbsolute(comPath)) {
      const entryAbsolutePath = path.dirname(path.join(rootContext, entryPath))
      const comAbsolutePath = path.join(entryAbsolutePath, comPath)
      comPath = path.relative(context, comAbsolutePath)
    }
    components.push({
      name,
      comPath: comPath
    })
  }
  return components
}
module.exports = h
