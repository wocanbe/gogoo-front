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
  getUser: 'user/info',
  saveUser: {
    method: 'put',
    url: 'user/info'
  },
  changePwd: {
    method: 'put',
    url: 'user/password'
  },
  setAvatar: {
    method: 'post',
    url: 'upload/avatar',
    processData: false, // 不要去处理发送的数据(重要参数),必须加
    contentType: false, // 不要去设置Content-Type请求头,必须加
  },
  getMockList: {
    method: 'get',
    url: 'manage/list'
  }
}

const commonConfigs = {
  method: 'GET',
  baseURL: window.apiPrefixPath
}
const ajaxConfigs = {}
export default { list, common: commonConfigs, configs: ajaxConfigs, methods }
