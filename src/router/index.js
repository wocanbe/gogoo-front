import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Main from '../views/Main.vue'
import Server from '../views/Server.vue'
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
        redirect: '/server'
      },
      {
        path: '/server',
        name: 'Server',
        meta: {
          title: '服务器信息'
        },
        component: Server
      },
      {
        path: '/mock',
        name: 'Mock',
        meta: {
          title: '模拟接口管理'
        },
        component: () => import(/* webpackChunkName: "component" */ '../views/mock/Index.vue')
      },
      {
        path: '/single',
        name: 'Single',
        meta: {
          title: '接口管理'
        },
        component: () => import(/* webpackChunkName: "component" */ '../views/single/Index.vue')
      },
      {
        path: '/mult',
        name: 'Mult',
        meta: {
          title: '组合接口管理'
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
