import methods from './methods'
const userServer = 'http://localhost:8080/api/'
const list = {
  checkcode: {
    url: userServer + 'checkcode',
    isCros: true
  },
  login: {
    method: 'post',
    url: userServer + 'login',
    isCros: true
  },
  reg: {
    method: 'post',
    url: userServer + 'reg',
    isCros: true
  },
  checkpath: 'quick/serve/check',
  getServe: 'quick/serve',
  getGqlList: 'quick/gql',
  getGqlAll: 'quick/gql/all',
  addGql: {
    method: 'post',
    url: 'quick/gql'
  },
  saveGql: {
    method: 'put',
    url: 'quick/gql'
  },
  saveGqlCode: {
    method: 'put',
    url: 'quick/gql/code'
  },
  getMultList: 'quick/gqls',
  addMult: {
    method: 'post',
    url: 'quick/gqls'
  },
  saveMult: {
    method: 'put',
    url: 'quick/gqls'
  },
  saveMultCode: {
    method: 'put',
    url: 'quick/gqls/code'
  }
}

const commonConfigs = {
  method: 'GET',
  baseURL: window.apiPrefixPath
}
const ajaxConfigs = {
  isStrict: false
}
export default { list, common: commonConfigs, configs: ajaxConfigs, methods }
