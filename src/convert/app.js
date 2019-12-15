const path = require('path')
const fs = require('fs')
const loaderUtils = require('loader-utils')
const h = require('./helper')
const template = require('./template')

const entryFile = '/input/app.js'

module.exports = function(source) {
  const { resourcePath, rootContext } = this
  if (path.join(rootContext, entryFile) !== resourcePath) {
    return source
  }
  if (this.query) {
    const options = loaderUtils.getOptions(this)
    if (options && options.type === 'worker') {
      const jsonContent = h.convertFile(resourcePath, 'json')
      const pagesString = h.getPagesString(jsonContent)
      return template.buildWorker.call(this, pagesString)
    }
  }
  const jsonContent = h.convertFile(resourcePath, 'json')
  const pagesString = h.getPagesString(jsonContent)
  const app = template.buildApp.call(this, pagesString)
  return app
}
