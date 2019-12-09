const template = {};
module.exports = template;
template.buildApp = pageString => {
  return `import Vue from "vue";
  import VueRouter from "vue-router";
  Vue.use(VueRouter);
  ${pageString}
  const router = new VueRouter({
    routes
  });
  new Vue({
    router,
    template: '<router-view></router-view>'
  }).$mount("#app");`;
};
