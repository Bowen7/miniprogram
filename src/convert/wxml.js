const h = require('./helper')
const t = require('./template')
const qs = require('querystring')
module.exports = function(source) {
  const { resourcePath, resourceQuery } = this
  const query = qs.parse(resourceQuery.slice(1))
  const { env = 'web' } = query
  const json = JSON.parse(h.convertFile(resourcePath, 'json'))
  const { usingComponents = {} } = json
  const components = h.convertUsingComponents.call(this, usingComponents)
  const script = h.convertFile(resourcePath, 'script')
  const template = h.convertFile(resourcePath, 'template')
  const style = env === 'worker' ? '' : h.convertFile(resourcePath, 'style')
  // const style = ''
  return t.buildComponent(template, script, style, components, env)
}
