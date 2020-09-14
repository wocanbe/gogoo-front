<template>
  <div>
    <el-form ref="form" :model="serverCfg" label-width="120px">
      <el-form-item v-if="canSave" label="请求地址">
        <el-input
          v-model="serverCfg.path"
          minlength="4"
          maxlength="20"
          placeholder="请输入服务路"
        ></el-input>
      </el-form-item>
      <el-form-item v-else label="请求地址">{{serverCfg.path}}</el-form-item>
      <el-form-item label="目标地址">
        <el-input v-model="serverCfg.proxy" placeholder="eg:http://localhost/api"></el-input>
      </el-form-item>
      <el-form-item label="域名白名单">
        <el-input v-model="serverCfg.origin" placeholder="eg:loclahost:8080"></el-input>
        <div class="tip-info" style="margin-top: 12px;">
          <ul>
            <li>域名白名单是指允许那些域名访问该接口，字符串数组。</li>
            <li>示例：['localhost:8080']。如果要允许所有域名，可以填true(代表不限)。</li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="自定义请求头">
        <el-input v-model="serverCfg.header" placeholder="eg:token"></el-input>
        <div class="tip-info" style="margin-top: 12px;">
          <ul>
            <li>允许的请求头,字符串</li>
            <li>一般用于标识用于登录状态，多个请求头之间用英文逗号分隔。如'token,authorization'</li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="友好提示">
        <el-switch v-model="serverCfg.friendly" active-text="启用" inactive-text="关闭"></el-switch>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="serverCfg.status" active-text="启用" inactive-text="关闭"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Server',
  data () {
    return {
      canSave: false,
      serverCfg: {
        path: '',
        proxy: '',
        origin: '',
        header: '',
        friendly: false,
        status: false
      }
    }
  },
  mounted () {
    this.getServer()
  },
  beforeRouteLeave (to, from, next) {
    if (this.canSave) {
      this.$alert('你是服务尚未初始化，请初始化后使用', '提示')
      next(false)
    } else {
      next(true)
    }
  },
  methods: {
    async getServer () {
      const res = await this.$ajax('getServe')
      if (res.length === 0) {
        this.$alert('你是服务尚未初始化，请初始化后使用', '提示')
        this.canSave = true
      } else {
        const serverCfg = res[0]
        if (serverCfg.friendly === 1) serverCfg.friendly = true
        if (serverCfg.status === 1) serverCfg.status = true
        this.serverCfg = serverCfg
        sessionStorage.setItem('serverid', res[0].id)
        sessionStorage.setItem('serverpath', res[0].path)
      }
    },
    async onSave () {
      const saveStatus = Object.assign({}, this.serverCfg)
      saveStatus.friendly = saveStatus.friendly ? 1 : 0
      saveStatus.status = saveStatus.status ? 1 : 0
      const res = await this.$ajax(this.canSave ? 'regServe' : 'saveServe', saveStatus)
      this.$alert('保存成功', '提示')
      if (this.canSave) {
        this.canSave = false
        sessionStorage.setItem('serverid', res)
        sessionStorage.setItem('serverpath', saveStatus.path)
      }
    }
  }
}
</script>