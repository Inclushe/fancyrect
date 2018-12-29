import Vue from 'vue'
import App from '../components/App'

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
