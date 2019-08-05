import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
// 挂载axios
Vue.prototype.$axios = axios
// 挂载element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
