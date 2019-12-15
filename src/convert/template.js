const h = require('./helper')
const path = require('path')
const template = {}
module.exports = template
template.buildApp = function(pageString) {
  const { resourcePath } = this
  const basename = path.basename(resourcePath)
  return `
import Worker from "!!worker-loader!${__dirname}/app.js?type=worker!./${basename}";
${pageString}
App({routes});
const worker = new Worker();
worker.postMessage({
  a: 1
});
  `
}

template.buildWorker = function(pageString) {
  const { resourcePath } = this
  const basename = path.basename(resourcePath)
  return `
  onmessage = function (e) {
    console.log('Message received from main script')
    console.log(e)
  };
  ${pageString}
//App({routes});
  `
}

template.buildComponent = (template, script, style, components) => {
  script = h.convertJs(script, components)
  return `
<template>
  ${template}
</template>

<script>
${script}
</script>

<style scoped>
  ${style}
</style>
  `
}
