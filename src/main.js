import Vue from 'vue'
import App from './App.vue'

import router from '@/router'
// 引入element-ui
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'

// 引入components
import components from '@/components'

// 引入全局样式
import '@/styles/index.less'

// 引入axios
import axios from '@/api/axios.js'
// 挂载axios
Vue.prototype.$axios = axios

// 挂载element-ui
Vue.use(ElementUI)
// 挂载components
Vue.use(components)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
