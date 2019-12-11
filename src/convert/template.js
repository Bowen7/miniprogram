const h = require('./helper');
const template = {};
module.exports = template;
template.buildApp = pageString => {
  return `
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
${pageString}
const router = new VueRouter({
  routes
});
new Vue({
  router,
  template: '<router-view></router-view>'
}).$mount("#app");
  `;
};

template.buildComponent = (template, script, style, components) => {
  script = h.convertJs(script, components);
  console.log(script);
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
  `;
};
