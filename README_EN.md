## Intro

Provide a server-side api aggregation method, and provide a more concise usage method than "graphql"

## safety warning

 - Do not use ``require`` statements in the code

  For security reasons, the ``require`` statement will be automatically removed when the code is saved, causing code execution errors.

 - Do not use the ``$`` symbol and other special symbols in the code

## Server setup

 - Install nodejs and mysql

 - Create database

   Create database ``testdb``，And execute the statement in ``table.sql`` in the root directory to initialize the database

 - Change setting

   Modify ``dataCfg`` in ``serve.config.js``

 - Open service

   Execute ``npm run serve`` to start the service

 - Configure servers and apis

## Instructions for use

### Single api forwarding
```js
/**
 * Single api processing method
 * @param {*} method Request method, value range GET, POST, PUT, DELETE, all uppercase
 * @returns {in: Function(data), out: Function(data)}, in is used to process the requested data, and out is used to process the returned data. The data here has been processed by common methods.
 */
function getData(method) {
  if (method === 'GET') {
    return {
      /**
       * request processing
       * @param {Object} data Request parameters, note: in get and delete requests, the parameters in the body will be ignored
       * @param {Function} format Formatting method, supports two parameters: data, format
       */
      in (data, format) {
        return format(data, {
          userid: 'int!' // type of data
        }) // Only submit the userid field submitted by the user to the background, and automatically discard other fields
      },
      /**
       * response processing
       */
      out (data, format) {
        return {
          code: 0,
          data: format(data, [{
              id: 'int',
              username: 'string'
          }]) // [Any] Represents the return value is an array, the first element in the array is the return value, only the id and username are retained in the returned data, other data such as class, age, sex, etc. are not returned
        }
      }
    }
  }
}
exports.getData = getData // Must implement gateData method
```
注释

 - The format method is used to implement data format verification and remove unnecessary data.
 - The data type currently supports ``any``, ``int``, ``bool``, ``string``, ``number``, ``date`` in 6 types, and the type is followed by ``!`` Represents a required field, such as ``int``, ``string!``
 - There is a special file ``_.js'', which applies to all apis. The parameters of the getData method are different from other files. The example is as follows


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

### Combined api forwarding
```js
/**
 * Combined api processing method
 * @param {Function} request Request method
 * @param {Array} apis Api configuration
 * @param {String} method Request method, available in some scenarios
 * @param {Object} headers Request header
 * @param {Object} data Request data
 */
async function getData(request, apis, method, headers, data) {
  const publicParams = {
    headers: {
      token: headers.token
    },
    query: { // Parameters for get and delete
      userid: data.userid
    },
    body: {} // Parameters for put and post
  }
  let res1
  res1 = await request(
    apis[0],
    publicParams
  )
  if (res1.data) {
    for (const item of res1.data) {
      const req = merge({ // It is equivalent to lodash/merge and will be automatically introduced.
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
## Configuration instructions
```js
{
  dataCfg: { // Database configuration
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "testdb"
  },
  main: { // Management services, management services do not provide user login and authentication services, and need to be implemented externally.
    port: "3000",
    /*
     * User authentication server address
     * Actual address: ${userDomain}user/status, request method is POST
     * Request parameter: {userid: int, token: 'string'}
     * Return parameter convention: {data: int}。eg: {data: 1} // 0 not logged in 1 logged in, 2 logged in expired, 3 kicked offline
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
## Supporting management system

[code](https://github.com/wocanbe/gogoo-front)

[demo](https://gogoo.cc/code/)

