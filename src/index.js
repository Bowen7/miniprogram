// import Worker from './main.worker.js';
// const worker = new Worker();
// worker.postMessage({
//   a: 1
// });
import Vue from '../dist/vue.web'
import source from './source.vue'
import com from './com.vue'
const routes = {
  '/': { redirect: '/source' },
  '/com': { component: com },
  '/source': { component: source }
}
const App = {
  data: function() {
    return {
      currentRoute: window.location.hash || '#/'
    }
  },
  computed: {
    ViewComponent() {
      const currentRoute = this.currentRoute.slice(1)
      const { component, redirect } = routes[currentRoute]
      return component ? component : routes[redirect].component
    }
  },
  watch: {
    currentRoute: {
      handler(newval) {
        if (newval !== window.location.hash) {
          window.location.hash = newval
        }
      },
      immediate: true
    }
  },
  beforeCreate() {
    window.addEventListener('hashchange', e => {
      this.currentRoute = window.location.hash
    })
  },
  render(h) {
    return h(this.ViewComponent)
  }
}
new Vue({
  render: h => h(App)
}).$mount('#app')
