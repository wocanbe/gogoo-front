## 简介
提供一种服务器端的api聚合方式，提供比``graphql``更简洁的api使用方式

## 安全提示

 - 代码中不要出现``require``语句

  基于安全原因，代码保存的时候会自动去掉``require``语句，造成代码执行出错。

 - 代码中不要出现``$``符号以及其他一些特殊符号

## 使用说明

### 单个接口转发
```js
/**
 * 单个接口处理方法
 * @param {*} method 请求方法，取值范围GET,POST,PUT,DELETE,全部大写
 * @returns {in: Function(data), out: Function(data)}, in用于处理请求数据，out用于处理返回数据。这儿的data已经经过通用方法处理。
 */
function getData(method) {
  if (method === 'GET') {
    return {
      /**
       * request处理
       * @param {Object} data 请求参数，注意: get和delete请求，body中的参数将被忽略
       * @param {Function} format 格式化方法，接受两个参数:数据(data),格式(format)
       */
      in (data, format) {
        return format(data, {
          userid: 'int!' // 数据类型
        }) // 仅仅将用户提交的userid字段提交给后台，自动丢弃其他字段
      },
      /**
       * response处理
       */
      out (data, format) {
        return {
          code: 0,
          data: format(data, [{
              id: 'int',
              username: 'string'
          }]) // [Any]代表返回值是数组，数组中第一个元素为返回值的约定,返回数据中只保留id和username两种信息，其他的信息如class，age，sex等不返回
        }
      }
    }
  }
}
exports.getData = getData // 必须实现gateData方法
```
注释

 - format方法用于实现数据格式检验并去除不需要的数据。
 - 数据类型目前支持``any``,``int``,``bool``,``string``,``number``,``date``6中类型，类型后面跟``!``代表必填字段，如``int``,``string!``
 - 有一个特殊文件``_.js``，该文件适用于所有接口，getData方法的参数跟其他文件有区别，示例如下

 ```js
 function getData() {
  return {
    in (data, headers) {
      headers['token'] = headers.token
      data['token'] = headers.token
      return data
    },
    out (data) {
      if (data.code === 0) return data.data
      else return [401, data.msg]
    }
  }
}
exports.getData = getData
```

### 组合接口转发
```js
/**
 * 组合接口处理方法
 * @param {Function} request 请求方法
 * @param {Array} apis 接口配置
 * @param {String} method 请求方法，某些场景可用
 * @param {Object} headers 请求头
 * @param {Object} data 请求数据
 */
async function getData(request, apis, method, headers, data) {
  const publicParams = {
    headers: {
      token: headers.token
    },
    query: { // get和delete的参数
      userid: data.userid
    },
    body: {} // put和post的参数
  }
  let res1
  res1 = await request(
    apis[0],
    publicParams
  )
  if (res1.data) {
    for (const item of res1.data) {
      const req = merge({ // 等同于lodash/merge，会自动引入。
        query: {
          id: item.id,
          password: data.pwd
        }
      }, publicParams)
      let res2
      res2 = await request(
        apis[1],
        req
      )
      item['pwdList'] = res2.data.pwdList
    }
  }
  return {
    code: res1.code,
    data: res1.data
  }
}
exports.getData = getData
```
## 配置说明
```js
{
  dataCfg: { // 数据库配置
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "testdb"
  },
  main: { // 管理服务，管理服务不提供用户登陆以及认证服务，需要外部实现。
    port: "3000",
    /*
     * 用户认证服务器地址
     * 实际使用地址: ${userDomain}user/status, 请求方式为 POST
     * 请求参数: {userid: int, token: 'string'}
     * 返回参数约定: {data: int}。eg: {data: 1} // 0 未登录  1 已登录，2 登陆已过期，3 被踢下线
     */
    userDomain: "http://localhost:8989/open/"
  },
  graphql: { // graphql服务配置
    port: "3001",
    single: "/gql",
    mult: "/gqls"
  }
}
```
## 配套管理系统

[代码](https://github.com/wocanbe/gogoo-front)

[示例](https://gogoo.cc/code/)
