const h = require('./helper');
const template = {};
module.exports = template;
template.buildApp = pageString => {
  return `
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const App = {
  render: c => {
    return c('router-view', '');
  }
}
${pageString}
const router = new VueRouter({
  routes
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
  `;
};

template.buildComponent = (template, script, style, components) => {
  script = h.convertJs(script, components);
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
