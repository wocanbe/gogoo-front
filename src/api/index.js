import Luck7Ajax from 'luck7-ajax'
import apiConfig from './config'

const _ajax = new Luck7Ajax(apiConfig.list, apiConfig.common, apiConfig.configs, apiConfig.methods)
const l7Ajax = function (apiName, params) {
  return _ajax.do(apiName, params)
}

const l7ApiInstall = function (Vue) {
  if (l7ApiInstall.installed) return
  Vue.prototype.$ajax = l7Ajax
}

const l7Api = {
  install: l7ApiInstall
}

export { l7Ajax }
export default l7Api
