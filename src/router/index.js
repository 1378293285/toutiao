// 路由
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Welcome from '@/views/welcome/index.vue'
import NotFound from '@/views/404/index.vue'
import Article from '@/views/article/index.vue'
import Image from '@/views/image/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: Image }
      ]

    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 注册一个全局的导航守卫
router.beforeEach((to, from, next) => {
  // 如果是登录页，放行
  // if (to.path === '/login') return next()
  // // 判断登录状态
  // const user = window.sessionStorage.getItem('hm-toutiao')
  // if (user) {
  //   next()
  // } else {
  //   next('/login')
  // }
  const user = window.sessionStorage.getItem('toutiao')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
