import Vue from 'vue'
import isString from 'lodash/isString'
import isObject from 'lodash/isObject'
import isBoolean from 'lodash/isBoolean'

// 默认验证规则
const defaultRules = {
  username: {
    validate: value => {
      return value ? /^[A-Za-z0-9]{3,15}$/.test(value) : '用户名不能为空'
    },
    message: '用户名格式错误'
  },
  password: {
    validate: value => {
      return value ? /[A-Za-z1-9]{5,12}/.test(value) : '密码不能为空'
    },
    message: '密码格式错误'
  },
  // 手机号码
  mobile: {
    validate: value => {
      return value ? /^1\d{10}$/.test(value) : '手机号码不能为空'
    },
    message: '手机号码格式错误'
  },
  // 验证码
  checkcode: {
    validate: value => {
      return value ? /^[A-Za-z1-9]{4}$/.test(value) : '验证码不能为空'
    },
    message: '请输入正确的验证码'
  },
  oldpassword: {
    validate: value => {
      return value ? true : '原密码不能为空'
    }
  },
  repassword: {
    validate: value => {
      return value ? true : '重复密码不能为空'
    }
  }
}

/**
 * 验证方法
 * @param {Object|String} rule - 需要验证的对象或直接传验证字符串
 * @return {Promise}
 */
function validateFun (rule, value) {
  if (isObject(rule)) {
    const stauts = []
    for (const key in rule) {
      stauts.push(validateFun(key, rule[key]))
    }
    return Promise.all(stauts).then(res => true)
  }
  const useRule = defaultRules[rule]
  if (useRule) {
    const validateStatus = useRule.validate(value)
    if (isBoolean(validateStatus)) {
      if (validateStatus) return Promise.resolve(true)
    } else if (isString(validateStatus)) {
      return Promise.reject(new Error(validateStatus))
    }
    return Promise.reject(new Error(useRule.message))
  } else {
    // console.warn(`规则${rule}未指定`)
    return Promise.resolve(true)
  }
}
// 全局注册$validate
const l7ValidateInstall = function (Vue) {
  if (l7ValidateInstall.installed) return
  Vue.prototype.$validate = validateFun
}
const l7Validate = {
  install: l7ValidateInstall
}

Vue.use(l7Validate)
