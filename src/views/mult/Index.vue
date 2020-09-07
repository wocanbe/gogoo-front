<style lang="scss" scoped>
.info {
  color: color("cn", "云山蓝");
  text-align: left;
  background-color: color("cn", "井天蓝");
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
    <el-table :data="gqlFiles">
      <el-table-column field="id" title="ID" width="60"></el-table-column>
      <el-table-column field="path" title="请求路径"></el-table-column>
      <el-table-column field="method" title="请求方法" :formatter="formatMethod"></el-table-column>
      <el-table-column field="status" title="状态" :formatter="formatStatus"></el-table-column>
      <el-table-column field="intro" title="简介"></el-table-column>
      <el-table-column type="seq" title="操作">
        <!-- <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()" title="添加"></i></span>
        </template> -->
        <template v-slot="{row}">
          <i class="operate fly-set" @click="editEvent(row)" title="选择"></i>
          <i class="operate fly-code" @click="codeEvent(row)" title="修改代码"></i>
          <i class="operate fly-play" @click="runEvent(row)" title="运行"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑接口配置"
      :visible.sync="showForm"
      width="60%"
      center>
      <div class="filename">
        请求路径: <input type="text" name="mockfile" v-model="formData.path">
      </div>
      <div class="filename">
        请求方法:
        <el-select v-model="formData.method" placeholder="请选择">
          <el-option label="GET" value="0"></el-option>
          <el-option label="POST" value="1"></el-option>
          <el-option label="PUT" value="2"></el-option>
          <el-option label="DELETE" value="3"></el-option>
        </el-select>
      </div>
      <div class="filename">
        简介: <input type="text" name="mockfile" v-model="formData.intro">
      </div>
      <div class="filename">
        要使用的api: <input type="text" name="mockfile" v-model="formData.raws">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showForm=false">取 消</el-button>
        <el-button type="primary" @click="saveGql">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑接口代码"
      :visible.sync="showCode"
      width="60%"
      center>
      <codemirror v-model="codeData.content"></codemirror>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCode=false">取 消</el-button>
        <el-button type="primary" @click="saveCode">保 存</el-button>
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
  name: 'gqls',
  components: {codemirror},
  data () {
    return {
      gqlFiles: [],
      showForm: false,
      showCode: false,
      isAdd: false,
      isJson: false,
      formData: {
        path: '',
        method: 0
      },
      codeData: {
        gid: '',
        content: '',
        intro: '',
        raws: '[]'
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
      const res = await this.$ajax('getMultList', {
        id: sessionStorage.getItem('serverid')
      })
      this.gqlFiles = res
    },
    async saveGql () {

    },
    async saveCode () {
      const apiName = this.isAdd ? 'addMult' : 'saveMult'
      await this.$ajax(apiName, {
        id: sessionStorage.getItem('serverid'),
        gid: this.codeData.gid,
        c: this.codeData.content
      })
      this.showCode = false
    },
    async testGql () {
      const res = await this.$ajax({
        url: 'http://localhost:3001/gqls/' + this.testData.path,
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
    editEvent (item) {
      this.formData = item
      this.showForm = true
    },
    codeEvent (item) {
      this.codeData.gid = item.id
      this.codeData.content = ''
      this.showCode = true
    },
    runEvent (item) {
      if (item.status === 0) {
        this.$alert('该接口尚未初始化', '提示')
        return
      }
      this.testData.path = item.path
      this.testData.method = methods[item.method]
      this.showTest = true
    }
  }
}
</script>