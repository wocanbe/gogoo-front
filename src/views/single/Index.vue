<style lang="scss" scoped>
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
    <el-table :data="gqlFiles">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="url" label="请求路径"></el-table-column>
      <el-table-column prop="method" label="请求方法"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
      <el-table-column type="seq" label="操作">
        <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()" title="添加"></i></span>
        </template>
        <template v-slot="{row}">
          <i class="operate fly-edit" @click="editEvent(row)" title="编辑"></i>
          <i class="operate fly-code" @click="codeEvent(row)" title="修改代码"></i>
          <i class="operate fly-play" v-if="row.status===1" @click="runEvent(row)" title="运行"></i>
        </template>
      </el-table-column>
    </el-table>

    <my-dialog title="编辑接口" :show.sync="showForm" @confirm="saveGql">
      <div class="filename" v-if="isAdd">
        <el-input type="text" name="target" placeholder="目标地址" v-model="formData.target"></el-input>
      </div>
      <div class="filename">
        请求方法:
        <el-select v-model="formData.method" placeholder="请选择">
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
          <el-option label="DELETE" value="DELETE"></el-option>
        </el-select>
      </div>
      <div class="filename">
        <el-input type="text" name="url" placeholder="接口请求路径" v-model="formData.url"></el-input>
      </div>
      <div class="filename">
        <el-input type="textarea" name="intro" placeholder="接口简介" v-model="formData.intro"></el-input>
      </div>
    </my-dialog>
    <my-dialog title="编辑代码" :show.sync="showCode" @confirm="saveCode">
      <div class="tip-info">
        <h3><i class="fly-info"></i>安全提示</h3>
        <ul>
          <li>1、 代码保存以后，将不会再展示代码，请提前备份好代码</li>
          <li>2、 代码中不要出现特殊字符(如'$')，不要出现require语句</li>
        </ul>
      </div>
      <codemirror ref="code" v-model="codeData.content"></codemirror>
    </my-dialog>
    <run-code
      v-model="showTest"
      prefix="/gql/gql/"
      :url="this.testData.path"
      :method="testData.method"></run-code>
  </div>
</template>
<script>
import codemirror from '@/components/Code'
import myDialog from '@/components/Dialog'
import runCode from '@/components/RunCode'
const status = ['未初始化', '正常']
export default {
  name: 'gql',
  components: {
    codemirror,
    myDialog,
    runCode
  },
  data () {
    return {
      gqlFiles: [],
      showForm: false,
      isAdd: true,
      formData: {
        url: '',
        target: '',
        method: 'GET',
        intro: ''
      },
      showCode: false,
      codeData: {
        id: '',
        content: ''
      },
      showTest: false,
      testData: {
        path: '',
        method: ''
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
      let apiName
      let params = {
        i: this.formData.intro,
        p: this.formData.url,
        m: this.formData.method
      }
      if (this.isAdd) {
        apiName = 'addGql'
        params['id'] = sessionStorage.getItem('serverid')
        params['t'] = this.formData.target
      } else {
        apiName = 'saveGql'
        params['id'] = this.formData.id
      }
      await this.$ajax(apiName, params)
      this.getList()
      this.showForm = false
    },
    async saveCode () {
      await this.$ajax('saveGqlCode', {
        id: this.codeData.id,
        c: this.codeData.content
      })
      this.getList()
      this.showCode = false
    },
    formatStatus (row, column, cellValue) {
      return status[cellValue]
    },
    addEvent () {
      this.formData.target = ''
      this.formData.method = 'GET'
      this.formData.url = ''
      this.formData.intro = ''
      this.isAdd = true
      this.showForm = true
    },
    editEvent (item) {
      this.formData = Object.assign({}, item)
      this.isAdd = false
      this.showForm = true
    },
    codeEvent (item) {
      this.codeData.id = item.id
      this.codeData.content = ''
      this.showCode = true
      this.$nextTick(() => {
        this.$refs.code.setVal('')
      })
    },
    runEvent (item) {
      if (item.status === 0) {
        this.$alert('该接口尚未初始化', '提示')
        return
      }
      this.testData.path = item.url
      this.testData.method = item.method
      this.showTest = true
    }
  }
}
</script>