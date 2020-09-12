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
    <el-table :data="gqls">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="path" label="请求路径"></el-table-column>
      <el-table-column prop="method" label="请求方法" :formatter="formatMethod"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
      <el-table-column type="seq" label="操作">
        <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()" title="添加"></i></span>
        </template>
        <template v-slot="{row}">
          <i class="operate fly-set" @click="editEvent(row)" title="编辑"></i>
          <i class="operate fly-code" @click="codeEvent(row)" title="修改代码"></i>
          <i v-if="row.status==1" class="operate fly-play" @click="runEvent(row)" title="运行"></i>
        </template>
      </el-table-column>
    </el-table>
    <my-dialog
      title="编辑接口配置"
      :show.sync="showForm"
      @confirm="saveGql">
      <div class="filename" v-if="isAdd">
        请求路径: <input type="text" name="path" v-model="formData.path">
      </div>
      <div class="filename">
        请求方法:
        <el-select v-model="formData.method" placeholder="请选择">
          <el-option label="GET" :value="0"></el-option>
          <el-option label="POST" :value="1"></el-option>
          <el-option label="PUT" :value="2"></el-option>
          <el-option label="DELETE" :value="3"></el-option>
        </el-select>
      </div>
      <div class="filename">
        简介: <input type="text" name="intro" v-model="formData.intro">
      </div>
      <div class="filename">
        要使用的api: <el-transfer :titles="['未选项', '已选项']" v-model="formData.raws" :data="gql"></el-transfer>
      </div>
    </my-dialog>
    <my-dialog
      title="编辑接口代码"
      :show.sync="showCode"
      @confirm="saveCode">
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
      prefix="/gql/gqls/"
      :url="this.testData.path"
      :method="testData.method"></run-code>
  </div>
</template>
<script>
import codemirror from '@/components/Code'
import myDialog from '@/components/Dialog'
import runCode from '@/components/RunCode'
const methods = ['GET', 'POST', 'PUT', 'DELETE']
const status = ['未初始化', '正常']
export default {
  name: 'gqls',
  components: {
    codemirror,
    myDialog,
    runCode
  },
  data () {
    return {
      gqls: [],
      gql: [],
      showForm: false,
      isAdd: false,
      formData: {
        id: null,
        path: '',
        method: 0,
        intro: '',
        raws: []
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
      const res = await this.$ajax('getMultList', {
        id: sessionStorage.getItem('serverid')
      })
      this.gqls = res
      const gql = await this.$ajax('getGqlList', {
        id: sessionStorage.getItem('serverid')
      })
      this.gql = gql.map(item => {
        return {
          key: item.id,
          label: item.intro
        }
      })
    },
    async saveGql () {
      let apiName
      let params = {
        method: this.formData.method,
        intro: this.formData.intro,
        raws: this.formData.raws
      }
      if (this.isAdd) {
        apiName = 'addMult'
        params['id'] = sessionStorage.getItem('serverid')
        params['path'] = this.formData.path
      } else {
        apiName = 'saveMult'
        params['id'] = this.formData.id
      }
      await this.$ajax(apiName, params)
      this.getList()
      this.showForm = false
    },
    async saveCode () {
      await this.$ajax('saveMultCode', {
        id: this.codeData.id,
        c: this.codeData.content
      })
      this.getList()
      this.showCode = false
    },
    formatMethod (row, column, cellValue) {
      return methods[cellValue]
    },
    formatStatus (row, column, cellValue) {
      return status[cellValue]
    },
    addEvent () {
      this.isAdd = true
      this.formData = {
        id: null,
        path: '',
        method: 0,
        intro: '',
        raws: []
      }
      this.showForm = true
    },
    editEvent (item) {
      this.isAdd = false
      this.formData = item
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
      this.testData.path = item.path
      this.testData.method = methods[item.method]
      this.showTest = true
    }
  }
}
</script>