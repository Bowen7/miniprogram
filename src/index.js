// import Vue from "vue"
import Worker from "./main.worker.js"
// const com = {
//   template: '<div class="test">456<button v-on:click="handleClick">click</button></div>',
//   methods: {
//     handleClick() {
//       this.$emit('myEvent')
//     }
//   }
// }
// const app = new Vue({
//   components: {
//     com
//   },
//   template: '<div><com v-on:myEvent="doSomething"/></div>',
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   },
//   methods: {
//     doSomething() {
//       console.log(this.message)
//     }
//   }
// })
const worker = new Worker();
worker.postMessage({
  a: 1
});
// console.log(app)
// import Vue from "./vue/src/platforms/web/entry-runtime-with-compiler";
import Vue from "../dist/vue.web";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import App from "./source.vu";
import com from "./com.vu";
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
