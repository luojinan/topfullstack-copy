import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import './plugins/axios.js'
import './plugins/avue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
