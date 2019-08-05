// 路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home }
  ]
})

export default router
