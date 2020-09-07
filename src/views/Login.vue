<template>
  <div class="login">
    <div class="bg"></div>
    <div class="login-form">
      <el-input v-model="loginData.username" placeholder="请输入用户名"/>
      <el-input v-model="loginData.password" type="password" placeholder="请输入密码"/>
      <el-input
        v-model="loginData.checkcode"
        maxlength="4"
        placeholder="请输入验证码"
        style="position:relative"
        @focus="getCheckCode()"
        @keyup.enter.native="onSubmit(true)"
      >
        <el-button
          slot="append"
          class="checkcode"
          size="small"
          :style="codeStyle"
          type="primary"
          @click="getCheckCode(true)"
        >获取验证码</el-button>
      </el-input>
      <br>
      <el-button class="login-btn" type="success" @click="onSubmit">登录</el-button>
      <div class="other">
        <router-link to="/reg">忘记密码</router-link>
        <router-link to="/reg">免费注册</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      loginData: {
        username: '',
        password: '',
        checkcode: '',
        verifycode: ''
      },
      codeStyle: {
        backgroundImage: '',
        color: ''
      }
    }
  },
  methods: {
    async getCheckCode(refresh) {
      if (refresh || this.loginData.verifycode === '') {
        const res = await this.$ajax('checkcode')
        this.loginData.verifycode = res.verifycode
        this.codeStyle.backgroundImage = 'url(' + res.img + ')'
        this.codeStyle.color = 'rgba(0,0,0,0)'
      }
    },
    async onSubmit() {
      try {
        await this.$validate(this.loginData)
        this.loading = true
        await this.$ajax('login', this.loginData)
        this.loading = false;
        this.$router.replace('/', () => {})
      } catch (e) {
        this.$alert({
          title: '提示',
          message: e.message
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  &-form {
    position: absolute;
    right: 20px;
    top: 150px;
    width: 380px;
    height: 300px;
    z-index: 99;
    padding: 30px;
    background-color: #fff;
    display: block;
    border-radius: 5px;
    box-shadow: 0 0 6px color("cn", "瓜瓤红");
    ::v-deep.el-input {
      margin: 6px 0;
    }
  }
  .checkcode {
    width: 90PX;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: none;
  }
  .login-btn {
    margin: 6px 0;
    width: 100%;
  }
  .other {
    text-align: right;
    a {
      font-size: 14px;
      color: gray;
      margin-left: 12px;
    }
  }
}
</style>
