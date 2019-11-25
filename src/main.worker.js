onmessage = function (e) {
  console.log('Message received from main script')
  console.log(e)
}
import Vue from "vue"
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