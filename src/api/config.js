import methods from './methods'
const list = {
  checkcode: 'checkcode',
  login: {
    method: 'post',
    url: 'login'
  },
  reg: {
    method: 'post',
    url: 'reg'
  },
  getMockList: {
    method: 'get',
    url: 'manage/list'
  },
  addMock: {
    method: 'post',
    url: 'manage/add'
  },
  saveMock: {
    method: 'post',
    url: 'manage/save'
  },
  getGqlList: {
    method: 'get',
    url: 'gql/list'
  },
  addGql: {
    method: 'post',
    url: 'gql/add'
  },
  saveGql: {
    method: 'post',
    url: 'gql/save'
  },
  getMultList: {
    method: 'get',
    url: 'gqls/list'
  },
  addMult: {
    method: 'post',
    url: 'gqls/add'
  },
  saveMult: {
    method: 'post',
    url: 'gqls/save'
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
