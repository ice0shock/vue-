import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'
import http from './http/http'
Vue.prototype.$http=http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
