const h = require('./helper');
module.exports = function(source) {
  const { resourcePath } = this;
  const json = JSON.parse(h.convertFile(resourcePath, 'json'));
  const { usingComponents = {} } = json;
  console.log(usingComponents);

  const js = h.convertFile(resourcePath, 'script');
  const template = h.convertFile(resourcePath, 'template');
  const style = h.convertFile(resourcePath, 'style');
  return `
<template>
  <div>123</div>
</template>

<script>
export default Page({
  properties: {
  },
  data(){
    return {
      count: 0
    }
  },
  methods: {
  },
  onReady() {
    console.log('created')
  }
});
</script>

<style scoped></style>
  `;
};
