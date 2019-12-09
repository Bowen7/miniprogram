const h = require('./helper');
module.exports = function(source) {
  const { resourcePath } = this;
  const jsContent = h.convertFile(resourcePath, 'script');
  // console.log(h.convertJs(jsContent));
  return `<template>
    <div>123</div>
  </template>

  <script>
  export default Page({
    name: "Test",
    components: {},
    data: function() {
      return {};
    },
    mounted() {
      console.log(this.$options._scopeId, this._uid);
    }
  });
  </script>

  <style scoped></style>
  `;
};
