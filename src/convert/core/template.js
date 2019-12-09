const template = {};
template.buildApp = (pagePaths) => {
  let routes = '';
  let redirect = '';
  pagePaths.forEach((pagePath, index) => {
    if (index === 0) {
      redirect = pagePath.path;
    }
    routes += `{path:'${pagePath.path}',component:'${pagePath.component}'},`
  })
  return `import Vue from "../dist/vue.web";
  import VueRouter from "vue-router";
  Vue.use(VueRouter);
  import App from "./source.vue";
  import com from "./com.vue";
  const routes = [
    {
      path: "/",
      redirect: "${redirect}"
    },
    ${routes}
  ];
  const router = new VueRouter({
    routes
  });
  new Vue({
    router,
    template: '<router-view></router-view>'
  }).$mount("#app");`
}
template.buildComponent = (template, script, style) => {
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
module.exports = template;
