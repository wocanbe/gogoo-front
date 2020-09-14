<template>
  <div class="reg">
    <div class="bg"></div>
    <div class="reg-form">
      <el-input v-model="regData.username" placeholder="注册用户名"></el-input>
      <el-input v-model="regData.password" placeholder="密码"></el-input>
      <el-input v-model="regData.repassword" placeholder="重复密码"></el-input>
      <el-input
        v-model="regData.checkcode"
        maxlength="4"
        placeholder="请输入验证码"
        style="position:relative"
        @focus="getCheckCode()"
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
      <div class="pd15">
        <el-button class="login-btn" type="success" @click="onReg">注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'reg',
  data() {
    return {
      regData: {
        username: '',
        password: '',
        repassword: '',
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
      if (refresh || this.regData.verifycode === '') {
        const res = await this.$ajax('checkcode')
        this.regData.verifycode = res.verifycode
        this.codeStyle.backgroundImage = 'url(' + res.img + ')'
        this.codeStyle.color = 'rgba(0,0,0,0)'
      }
    },
    async onReg() {
      try {
        await this.$validate(this.regData)
        this.loading = true
        await this.$ajax('reg', this.regData)
        this.loading = false;
        this.$router.replace('/login', () => {})
      } catch (e) {
        this.$alert(e.message, '提示')
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.reg {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  padding: 80px;
  &-form {
    width: 380px;
    height: 300px;
    margin: 0 auto;
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
}
</style>