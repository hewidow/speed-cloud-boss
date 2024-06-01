import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element'
import './assets/css/public.css'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
// axios.defaults.baseURL = 'http://47.98.150.74:4399/'
axios.defaults.baseURL = '/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
