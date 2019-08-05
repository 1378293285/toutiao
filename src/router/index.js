// 路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Welcome from '@/views/welcome/index.vue'
import NotFound from '@/views/404/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]

    },
    { path: '*', name: '404', component: NotFound }
  ]
})

export default router
