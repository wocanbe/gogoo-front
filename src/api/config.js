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
  getMockList: {
    method: 'get',
    url: 'quick/manage'
  },
  addMock: {
    method: 'post',
    url: 'quick/manage'
  },
  saveMock: {
    method: 'put',
    url: 'quick/manage'
  },
  getGqlList: {
    method: 'get',
    url: 'quick/gql'
  },
  addGql: {
    method: 'post',
    url: 'quick/gql'
  },
  saveGql: {
    method: 'put',
    url: 'quick/gql'
  },
  getMultList: {
    method: 'get',
    url: 'quick/gqls'
  },
  addMult: {
    method: 'post',
    url: 'quick/gqls'
  },
  saveMult: {
    method: 'put',
    url: 'quick/gqls'
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
