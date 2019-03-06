import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import goods from '@/router/goods.js'
import users from './user.js'
import order from './order.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [...goods, ...users, ...order],
    },

  ]
})
