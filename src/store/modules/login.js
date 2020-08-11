const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const state = {
  loginData: {
    rem: false,
    autoVal: false
  }
}
const getters = {}

const actions = {}

const mutations = {
  [LOGIN] (state, loginData) {
    state.loginData = loginData
    window.sessionStorage.setItem('userid', loginData.id)
    window.sessionStorage.setItem('username', loginData.username)
    window.sessionStorage.setItem('nickname', loginData.nickname)
    window.sessionStorage.setItem('token', loginData.token)
    window.sessionStorage.setItem('role', loginData.role)
  },
  [LOGOUT] (state) {
    state.loginData = {}
    window.sessionStorage.removeItem('userid')
    window.sessionStorage.removeItem('username')
    window.sessionStorage.removeItem('nickname')
    window.sessionStorage.removeItem('token')
    window.sessionStorage.removeItem('role')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
