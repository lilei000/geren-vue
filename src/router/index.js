import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/HelloWorld'
import login from '@/components/login'
import view from '@/components/home'
import ceshi from '@/components/font/ceshi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/view',
      name: 'view',
      component: view,
      redirect:"/view/home",
      children: [
         {
          path: 'home',
          name: 'home',
          component: home
        },
        {
          path: 'ceshi',
          name: 'ceshi',
          component: ceshi
        }
      ]
    }
  ]
})
