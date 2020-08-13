<style lang="scss" scoped>
.info {
  color: $云山蓝;
  text-align: left;
  background-color: $井天蓝;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 15px;
  p {
    text-indent: 2em;
  }
}
.filename {
  margin: 15px 0;
  input {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 200px;
    &:hover {
      border-color: #c0c4cc;
    }
  }
}
.btn {
  margin-top: 30px;
  text-align: center;
}
</style>
<template>
  <div>
    <div class="info">
      <h3><i class="fly-info"></i>提示</h3>
      <ul>
        <li>1、 接口文件保存以后，将不会再展示代码，请提前备份好代码</li>
        <li>2、 接口文件，代码中不要出现require语句，为了方便，代码会自动引入接口js，可以直接使用</li>
      </ul>
    </div>
    <vxe-table :data="gqlFiles">
      <vxe-table-column field="id" title="ID" width="60"></vxe-table-column>
      <vxe-table-column field="url" title="请求路径"></vxe-table-column>
      <vxe-table-column field="method" title="请求方法" :formatter="formatMethod"></vxe-table-column>
      <vxe-table-column field="status" title="状态" :formatter="formatStatus"></vxe-table-column>
      <vxe-table-column type="seq" title="操作">
        <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()" title="添加"></i></span>
        </template>
        <template v-slot="{row}">
          <i class="operate fly-set" @click="setEvent(row)" title="修改配置"></i>
          <i class="operate fly-play" @click="runEvent(row)" title="运行"></i>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-dialog
      title="编辑接口配置"
      :visible.sync="showForm"
      width="60%"
      center>
      <codemirror v-model="formData.content"></codemirror>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showForm=false">取 消</el-button>
        <el-button type="primary" @click="saveGql">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="运行接口"
      :visible.sync="showTest"
      width="60%"
      center>
      <div class="filename">
        请求方法: {{testData.method}}
      </div>
      <div class="filename">请求参数</div>
      <codemirror v-model="testData.req" mode="json" height="150px"></codemirror>
      <div class="btn">
        <el-button type="primary" @click="testGql">测 试</el-button>
      </div>
      <div class="filename">返回参数</div>
      <codemirror ref="result" v-model="testData.res" mode="other" height="150px"></codemirror>
    </el-dialog>
  </div>
</template>
<script>
import codemirror from '@/components/Code'
const methods = ['GET', 'POST', 'PUT', 'DELETE']
const status = ['未初始化', '正常']
export default {
  name: 'gql',
  components: {codemirror},
  data () {
    return {
      gqlFiles: [],
      showForm: false,
      isAdd: false,
      isJson: false,
      formData: {
        gid: '',
        content: ''
      },
      showTest: false,
      testData: {
        path: '',
        method: '',
        req: '{}',
        res: ''
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await this.$ajax('getGqlList', {
        id: sessionStorage.getItem('serverid')
      })
      this.gqlFiles = res
    },
    async saveGql () {
      const apiName = this.isAdd ? 'addGql' : 'saveGql'
      await this.$ajax(apiName, {
        id: sessionStorage.getItem('serverid'),
        gid: this.formData.gid,
        c: this.formData.content
      })
      this.showForm = false
    },
    async testGql () {
      const res = await this.$ajax({
        url: 'http://localhost:3001/gql/' + this.testData.path,
        method: this.testData.method,
        isCros: true
      }, JSON.parse(this.testData.req))
      this.testData.res = res
      this.$refs.result.setVal(JSON.stringify(res))
      // console.log(this.$refs.result)
      // this.$nextTick(() => this.$refs.result.refresh())
    },
    formatMethod (item) { // { cellValue, row, column }
      return methods[item.cellValue]
    },
    formatStatus (item) { // { cellValue, row, column }
      return status[item.cellValue]
    },
    addEvent () {
      // this.isAdd = true
      // this.formData.gid = ''
      // this.formData.content = ''
      // this.showForm = true
    },
    editEvent () {
      // this.formData.gid = item.id
      // this.formData.content = ''
      // this.showForm = true
    },
    setEvent (item) {
      this.formData.gid = item.id
      this.formData.content = ''
      this.showForm = true
    },
    runEvent (item) {
      this.testData.path = item.url
      this.testData.method = methods[item.method]
      this.showTest = true
    }
  }
}
</script>