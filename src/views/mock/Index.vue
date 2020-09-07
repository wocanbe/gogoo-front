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
        <li>1、 模拟数据文件保存以后，将不会再展示代码，请提前备份好代码</li>
        <li>2、 支持js和json两种模拟数据文件,模拟文件路径和名称规则为'${path}.js'、'${path}.json'或者'${path}_${method}.json'</li>
        <li>3、 js格式模拟文件，代码中不要出现require语句，为了方便，代码会自动引入mockjs，可以直接使用</li>
        <li>4、 js格式模拟文件，需要实现getData方法，方法可以返回任意类型(包含Promise)</li>
        <li>
          5、 getData返回数据为以下两种情况时，将作为错误处理
          <p>Error类型对象，返回500，信息内容为e.message</p>
          <p>[number,string]格式的数组，返回状态为array[0],信息内容为array[1]</p>
        </li>
      </ul>
    </div>
    <el-table :data="mockFiles">
      <el-table-column type="seq" title="序号" width="60"></el-table-column>
      <el-table-column field="path" title="文件名"></el-table-column>
      <el-table-column type="seq" title="操作">
        <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()" title="添加"></i></span>
        </template>
        <template v-slot="{row}">
          <i class="operate fly-edit" @click="editEvent(row)" title="编辑"></i>
          <!-- <i class="operate fly-del" @click="delEvent(row)" title="删除"></i> -->
          <i class="operate fly-play" @click="runEvent(row)" title="运行"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑模拟代码"
      :visible.sync="showForm"
      width="60%"
      center>
      <div class="filename" v-if="isAdd">
        mock文件: <input type="text" name="mockfile" v-model="formData.file">
      </div>
      <codemirror v-model="formData.content"></codemirror>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showForm=false">取 消</el-button>
        <el-button type="primary" @click="saveMock">保 存</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="运行模拟接口"
      :visible.sync="showTest"
      width="60%"
      center>
      <div class="filename" v-if="testData.noChange">
        请求方法: {{testData.method}}
      </div>
      <div class="filename" v-else>
        请求方法:
        <el-select v-model="testData.method" placeholder="请选择">
          <el-option label="GET" value="get"></el-option>
          <el-option label="POST" value="post"></el-option>
          <el-option label="PUT" value="put"></el-option>
          <el-option label="DELETE" value="delete"></el-option>
        </el-select>
      </div>
      <div class="filename">请求参数</div>
      <codemirror v-model="testData.req" mode="json" height="150px"></codemirror>
      <div class="btn">
        <el-button type="primary" @click="testMock">测 试</el-button>
      </div>
      <div class="filename">返回参数</div>
      <codemirror ref="result" v-model="testData.res" mode="other" height="150px"></codemirror>
    </el-dialog>
  </div>
</template>
<script>
import codemirror from '@/components/Code'
export default {
  name: 'Mock',
  components: {codemirror},
  data () {
    return {
      mockFiles: [],
      showForm: false,
      isAdd: false,
      isJson: false,
      formData: {
        file: '',
        content: ''
      },
      showTest: false,
      testData: {
        path: '',
        method: '',
        noChange: false,
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
      const res = await this.$ajax('getMockList', {
        id: sessionStorage.getItem('serverid')
      })
      this.mockFiles = res.map(item => {
        return { path: item }
      })
    },
    async saveMock () {
      const apiName = this.isAdd ? 'addMock' : 'saveMock'
      await this.$ajax(apiName, {
        id: sessionStorage.getItem('serverid'),
        f: this.formData.file,
        c: this.formData.content
      })
      this.showForm = false
    },
    async testMock () {
      const res = await this.$ajax({
        url: 'http://localhost:3002/mock/' + this.testData.path,
        method: this.testData.method,
        isCros: true
      }, JSON.parse(this.testData.req))
      this.testData.res = res
      this.$refs.result.setVal(res)
      // console.log(this.$refs.result)
      // this.$nextTick(() => this.$refs.result.refresh())
    },
    addEvent () {
      this.isAdd = true
      this.formData.file = ''
      this.formData.content = ''
      this.showForm = true
    },
    editEvent (item) {
      this.formData.file = item.path
      this.formData.content = ''
      this.showForm = true
    },
    runEvent (item) {
      let mockPath
      if (item.path.substr(-5) === '.json') {
        mockPath = item.path.slice(0,-5)
        if (mockPath.substr(-4) === '_get') {
          this.testData.noChange = true
          mockPath = mockPath.slice(0,-4)
          this.testData.method = 'get'
        } else if (mockPath.substr(-4) === '_put') {
          this.testData.noChange = true
          mockPath = mockPath.slice(0,-4)
          this.testData.method = 'put'
        } else if (mockPath.substr(-5) === '_post') {
          this.testData.noChange = true
          mockPath = mockPath.slice(0,-5)
          this.testData.method = 'post'
        } else if (mockPath.substr(-7) === '_delete') {
          this.testData.noChange = true
          mockPath = mockPath.slice(0,-7)
          this.testData.method = 'delete'
        } else {
          this.testData.noChange = false
          this.testData.method = 'get'
        }
      } else {
          this.testData.noChange = false
        this.testData.method = 'get'
        mockPath = item.path.slice(0,-3)
      }
      this.testData.path = mockPath
      this.showTest = true
    }
  }
}
</script>