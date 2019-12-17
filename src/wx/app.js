import Vue from 'vue'
import { StateCenter } from './utils'
const AppInfo = new StateCenter({ route: '' })
const inWorker = typeof window === 'undefined'
const App = ({ routes }) => {
  const AppWrap = {
    data: function() {
      return {
        currentRoute: AppInfo.route
      }
    },
    computed: {
      ViewComponent() {
        const currentRoute = this.currentRoute.slice(1)
        const { component } = routes[currentRoute]
        return component
      }
    },
    watch: {
      currentRoute: {
        handler(newval) {
          if (window && newval !== window.location.hash) {
            window.location.hash = newval
          }
        },
        immediate: true
      }
    },
    beforeCreate() {
      if (!inWorker) {
        const route = window.location.hash || '#' + routes[0].path
        AppInfo.setState('route', route)
      }

      AppInfo.watch('route', val => {
        this.currentRoute = val
      })
    },
    render(h) {
      return h(this.ViewComponent)
    }
  }
  new Vue({
    render: h => h(AppWrap)
  }).$mount('#app')
}
export default App
