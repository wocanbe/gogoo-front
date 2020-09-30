import methods from './methods'
const list = {
  checkcode: 'api/checkcode',
  login: {
    method: 'post',
    url: 'api/login'
  },
  reg: {
    method: 'post',
    url: 'api/reg'
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
