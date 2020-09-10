<template>
  <el-dialog
    title="运行接口"
    :visible="value"
    @close="toCancel"
    width="60%"
    center>
    <div class="filename" v-if="method">
      请求方法: {{method}}
    </div>
    <div class="filename" v-else>
      请求方法:
      <el-select v-model="runData.method" placeholder="请选择">
        <el-option label="GET" value="get"></el-option>
        <el-option label="POST" value="post"></el-option>
        <el-option label="PUT" value="put"></el-option>
        <el-option label="DELETE" value="delete"></el-option>
      </el-select>
    </div>
    <div class="filename">请求参数</div>
    <codemirror v-model="runData.req" mode="json" height="150px"></codemirror>
    <div class="btn">
      <el-button type="primary" @click="testRun">测 试</el-button>
    </div>
    <div class="filename">返回参数</div>
    <codemirror ref="result" v-model="runData.res" mode="json" height="150px"></codemirror>
  </el-dialog>
</template>
<script>
import codemirror from '@/components/Code'
export default {
  props: {
    value: Boolean,
    prefix: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: ''
    }
  },
  components: {
    codemirror
  },
  data () {
    return {
      runData: {
        method: 'get',
        req: '{}',
        res: ''
      }
    }
  },
  methods: {
    toCancel () {
      this.$emit('input', false)
    },
    async testRun () {
      const res = await this.$ajax({
        url: this.prefix + sessionStorage.getItem('serverpath') + '/' + this.url,
        method: this.method || this.runData.method
      }, JSON.parse(this.runData.req))
      this.runData.res = res
      this.$refs.result.setVal(res)
    }
  }
}
</script>
<style lang="scss" scoped>
.filename {
  margin: 15px 0;
}
.btn {
  margin-top: 30px;
  text-align: center;
}
</style>