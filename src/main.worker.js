onmessage = function (e) {
  console.log('Message received from main script')
  console.log(e)
}
import Vue from "vue"
import VueRouter from "vue-router";
Vue.use(VueRouter);
import App from "./source.vue";
import com from "./com.vue";
const routes = [{
    path: "/",
    redirect: "/foo"
  },
  {
    path: "/foo",
    component: App
  },
  {
    path: "/bar",
    component: com
  }
];
const router = new VueRouter({
  routes
});
new Vue({
  router,
  template: `<router-view></router-view>`
}).$mount("#app");
