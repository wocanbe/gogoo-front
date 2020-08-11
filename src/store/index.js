import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    errType: '错误',
    errMsg: '测试数据',
    mask: false,
    loading: false
  },
  mutations: {
    setMask (state, mask) {
      state.mask = mask
    },
    setErrMsg (state, errMsg) {
      state.errMsg = errMsg
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    clean (state) {
      state.loading = false
      state.errMsg = ''
      state.mask = false
    }
  },
  actions: {
  },
  modules: {
    login
  }
})

// store.registerModule('storeName', {storeConfig: ''})
export default store
