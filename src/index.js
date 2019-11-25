import Vue from "vue"
import Worker from "./main.worker.js"
const com = {
  template: '<view>456<button v-on:click="handleClick">click</button></view>',
  methods: {
    handleClick() {
      this.$emit('myEvent')
    }
  }
}
const app = new Vue({
  components: {
    com
  },
  template: '<view><com v-on:myEvent="doSomething"/></view>',
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    doSomething() {
      console.log(this.message)
    }
  }
})
const worker = new Worker();
worker.postMessage({
  a: 1
});
console.log(app)