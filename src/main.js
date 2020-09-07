import Vue from 'vue'
import App from './App.vue'
import l7Api from './api'
import router from './router'
import store from './store'
import './plugins/element'
import './plugins/validate'
import './assets/common.scss'

Vue.config.productionTip = false

Vue.use(l7Api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
