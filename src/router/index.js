import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/mock',
        name: 'Mock',
        component: () => import(/* webpackChunkName: "component" */ '../views/mock/Index.vue')
      },
      {
        path: '/mult',
        name: 'Mult',
        component: () => import(/* webpackChunkName: "component" */ '../views/mult/Index.vue')
      },
      {
        path: '/single',
        name: 'Single',
        component: () => import(/* webpackChunkName: "component" */ '../views/single/Index.vue')
      },
      {
        path: '/demo/codejs',
        name: 'CodeJS',
        component: () => import(/* webpackChunkName: "component" */ '../views/demo/CodeJs.vue')
      },
      {
        path: '/demo/codejson',
        name: 'CodeJson',
        component: () => import(/* webpackChunkName: "component" */ '../views/demo/CodeJson.vue')
      }
    ]
  },{
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: window.base,
  linkActiveClass: 'on',
  routes
})

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('token')
  if (token === null) {
    if (to.path === '/login' || to.path === '/reg') {
      store.commit('clean') // 进入新页面，清除上个页面的页面状态(error,loading等)
      document.title = to.meta.title
      next()
    } else {
      store.commit('login/LOGOUT')
      next({ name: 'login', replace: true })
    }
  } else {
    store.commit('clean')
    if (to.meta.needId && !to.query.id) {
      alert('缺少参数id')
      next(false)
    } else {
      if (to.fullPath === '/login') next({ name: 'home', replace: true })
      else {
        if (to.meta && to.meta.title) document.title = to.meta.title
        next()
      }
    }
  }
})

export default router
