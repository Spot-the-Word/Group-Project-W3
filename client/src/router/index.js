import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlayPage from '../views/PlayPage.vue'
import WinPage from '../views/WinPage.vue'
import LosePage from '../views/LosePage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/play',
    name: 'PlayPage',
    component: PlayPage
  },
  {
    path: '/losepage',
    name: 'LosePage',
    component: LosePage
  },
  {
    path: '/winpage',
    name: 'WinPage',
    component: WinPage
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if(!localStorage.name && to.name === 'PlayPage' && from.name === 'Home'){
//     next({name: 'Home'})
//   } else if( localStorage.name && from.name === 'PlayPage' && to.name === 'Home'){
//     next({name: 'PlayPage'})
//   }else{
//     next
//   }
// })

export default router
