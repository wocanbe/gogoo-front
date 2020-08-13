import {isString, isObject, isArray} from 'lodash'
import store from '../store'
import router from '../router'

function removeEmpty (data) {
  if (isArray(data)) return data
  const backObj = {}
  for (const k in data) {
    const v = data[k]
    if (v === undefined || v === null || v === '') continue
    if (isObject(v)) backObj[k] = removeEmpty(v)
    else backObj[k] = v
  }
  return backObj
}
function addJsonData (data) {
  const userid = sessionStorage.getItem('userid')
  const token = sessionStorage.getItem('token')
  const backData = { userid, token }
  for (const k in removeEmpty(data)) {
    let v = data[k]
    if (typeof v === 'string' && v.substr(0, 5) === 'vuex.') {
      const path = v.substr(5).split('.')
      v = path.reduce(function (acc, cur, idx, src) { // 上次结果，当前元素，序号，原数组
        return acc[cur]
      }, store.state) // 初始值，如果没有提供，则使用第一个元素
    }
    backData[k] = v
  }
  return backData
}
function reqFiter (req) {
  if (req[1].skipLoading) delete req[1].skipLoading
  else store.commit('setLoading', true)
  let isJson = true
  const contentType = req[0].options.headers['Content-Type']
  if (contentType && contentType !== 'application/json') isJson = false
  if (isJson) req[1] = addJsonData(req[1])
}
function resFiter (data) {
  store.commit('setLoading', false)
  if (isString(data)) return data
  if (data.code === 0) return data.data
  else {
    if (data.code === 401) {
      alert(data.msg)
      store.commit('login/LOGOUT')
      router.push({ name: 'login' })
      return Promise.resolve()
    } else {
      return Promise.reject(new Error(data.msg))
    }
  }
}
function errFiter (err) {
  store.commit('setLoading', false)
  store.commit('setErrMsg', err.message)
  throw err
}
const methods = {
  _ () { // interceptors用于实现对request和respone的拦截
    return {
      request: reqFiter,
      response: resFiter,
      error: errFiter
    }
  },
  checkcode () {
    return {
      request (res) {
        return res
      },
      response (data) {
        if (data.code === 0) return data.data
        else return {}
      }
    }
  },
  login () {
    return {
      response (res) {
        if (res.code === 0) {
          // 保存登录信息
          store.commit('login/LOGIN', res.data)
        } else {
          alert(res.msg)
        }
      },
      error (err) {
        store.commit('ERR_MSG', '登录失败，错误详情：' + err.message)
      }
    }
  },
  reg () {
    return {
      response (res) {
        if (res.code === 0) {
          alert('注册成功')
        } else {
          return Promise.reject(new Error(res.msg))
        }
      },
      error (err) {
        store.commit('setErrMsg', err.message)
        throw err
      }
    }
  }
}

export default methods
