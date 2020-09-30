import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '欢迎'
        },
        component: Home
      },
      {
        path: '/single',
        name: 'Single',
        meta: {
          title: '接口管理',
          needServe: true
        },
        component: () => import(/* webpackChunkName: "component" */ '../views/single/Index.vue')
      },
      {
        path: '/mult',
        name: 'Mult',
        meta: {
          title: '组合接口管理',
          needServe: true
        },
        component: () => import(/* webpackChunkName: "component" */ '../views/mult/Index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登陆',
      nouser: true // 不需要登录
    },
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    meta: {
      title: '注册',
      nouser: true // 不需要登录
    },
    component: Reg
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
    if (to.meta.nouser) {
      store.commit('clean') // 进入新页面，清除上个页面的页面状态(error,loading等)
      document.title = to.meta.title
      next()
    } else {
      store.commit('login/LOGOUT')
      next({ name: 'login', replace: true })
    }
  } else {
    store.commit('clean')
    const serveid = window.sessionStorage.getItem('serverid')
    if (to.meta.needId && !to.query.id) {
      alert('缺少参数id')
      next(false)
    } else if (to.meta.needServe && !serveid) {
      alert('请先选择要管理的服务器')
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
