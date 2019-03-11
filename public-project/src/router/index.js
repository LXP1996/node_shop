import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect:"/index",
      children:[{
        path:"/index",
        name:"index",
        component:()=>import("@/views/index.vue")
      },{
        path:"/buyPage",
        name:"buyPage",
        component:()=>import("@/components/buyPage.vue")
      },{
        path:"/shoppingcart",
        name:"shoppingcart",
        component:()=>import("@/components/shoppingcart.vue")
      }]
    },
    {
      path:"/login",
      name:"login",
      component:()=>import("@/components/login.vue")
    },
    {
      path:"/register",
      name:"register",
      component:()=>import("@/components/register.vue")
    }
  ]
})
