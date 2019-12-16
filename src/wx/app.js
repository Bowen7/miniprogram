import Vue from 'vue'
const App = ({ routes }) => {
  const AppWrap = {
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
      window.addEventListener('hashchange', () => {
        this.currentRoute = window.location.hash
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
