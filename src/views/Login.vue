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
      <div class="pd15">
        <el-button class="login-btn" type="success" @click="onSubmit">登录</el-button>
        <el-button class="login-btn" type="primary" @click="toReg">免费注册</el-button>
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
        this.$dialog.alert({
          title: '提示',
          message: e.message
        })
      }
    },
    toReg () {
      this.$router.push({
        path: '/reg'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .bg {
    opacity: 0.7;
    filter: blur(0.02778rem);
  }
  &-form {
    position: absolute;
    left: 10%;
    top: 60%;
    z-index: 99;
    width: 80%;
    background-color: #fff;
    display: block;
    border-radius: 5px;
    box-shadow: 0 0 6px color("cn", "瓜瓤红");
  }
  .checkcode {
    width: 90PX;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    border: none;
  }
  .login-btn {
    border-radius: 0 0 5px 5px;
    width: 50%;
  }
}
</style>
