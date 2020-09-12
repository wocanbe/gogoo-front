<style lang="scss" scoped>
.filename {
  margin: 15px 0;
}
</style>
<template>
  <div>
    <el-table :data="mockFiles">
      <el-table-column prop="id" label="ID" width="60"></el-table-column>
      <el-table-column prop="file" label="文件名">
        <template v-slot:header>
          文件名
          <el-popover
            placement="top-start"
            trigger="hover"
            content="支持js和json两种模拟数据文件,模拟文件路径和名称规则为'${path}.js'、'${path}.json'或者'${path}_${method}.json'">
            <i slot="reference" class="fly-help"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column type="seq" label="操作">
        <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()" title="添加"></i></span>
        </template>
        <template v-slot="{row}">
          <i class="operate fly-code" @click="codeEvent(row)" title="修改代码"></i>
          <!-- <i class="operate fly-del" @click="delEvent(row)" title="删除"></i> -->
          <i v-if="row.status===1" class="operate fly-play" @click="runEvent(row)" title="运行"></i>
        </template>
      </el-table-column>
    </el-table>

    <my-dialog title="添加模拟接口" :show.sync="showForm" @confirm="addMock">
      <div class="filename">
        <el-input type="text" name="mockfile" placeholder="mock文件名称" v-model="formData.file"></el-input>
      </div>
    </my-dialog>
    <my-dialog title="编辑模拟代码" :show.sync="showCode" @confirm="saveMock">
      <div class="tip-info">
        <h3><i class="fly-info"></i>提示</h3>
        <ul>
          <li>1、 基于安全考虑，模拟数据文件保存以后，将不会再展示代码，请提前备份好代码</li>
          <template v-if="codeType==='js'">
            <li>2、 需要实现getData方法，方法可以返回任意类型(包含Promise)</li>
            <li>
              3、 getData返回数据为以下两种情况时，将作为错误处理
              <p>Error类型对象，返回500，信息内容为e.message</p>
              <p>[number,string]格式的数组，返回状态为array[0],信息内容为array[1]</p>
            </li>
            <li>4、 基于安全考虑，代码中不要出现特殊字符(如'$')，不要出现require语句(为了方便，代码会自动引入Mockjs，可以直接使用)</li>
          </template>
        </ul>
      </div>
      <codemirror ref="code" v-model="formData.content" :mode="codeType"></codemirror>
    </my-dialog>
    <run-code
      v-model="showTest"
      prefix="/mock/mock/"
      :url="this.testData.path"
      :method="testData.method"></run-code>
  </div>
</template>
<script>
import codemirror from '@/components/Code'
import myDialog from '@/components/Dialog'
import runCode from '@/components/RunCode'
export default {
  name: 'Mock',
  components: {
    codemirror,
    myDialog,
    runCode
  },
  data () {
    return {
      mockFiles: [],
      showForm: false,
      showCode: false,
      codeType: 'js',
      isAdd: false,
      formData: {
        id: 0,
        file: '',
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
      const res = await this.$ajax('getMockList', {
        id: sessionStorage.getItem('serverid')
      })
      this.mockFiles = res
    },
    async addMock () {
      await this.$ajax('addMock', {
        id: sessionStorage.getItem('serverid'),
        f: this.formData.file
      })
      this.getList()
      this.showForm = false
    },
    async saveMock () {
      if (!this.formData.content) {
        this.$alert('代码不能为空', '提示')
        return
      }
      await this.$ajax('saveMock', {
        id: this.formData.id,
        c: this.formData.content
      })
      this.getList()
      this.showCode = false
    },
    addEvent () {
      this.isAdd = true
      this.formData.file = ''
      this.showForm = true
    },
    codeEvent (item) {
      this.formData.id = item.id
      this.formData.file = item.file
      this.formData.content = ''
      if (item.file.substr(-5) === '.json') {
        this.codeType = 'json'
      } else {
        this.codeType = 'js'
      }
      this.showCode = true
      this.$nextTick(() => {
        this.$refs.code.setVal('')
      })
    },
    runEvent (item) {
      let mockPath
      if (item.file.substr(-5) === '.json') {
        mockPath = item.file.slice(0,-5)
        if (mockPath.substr(-4) === '_get') {
          mockPath = mockPath.slice(0,-4)
          this.testData.method = 'get'
        } else if (mockPath.substr(-4) === '_put') {
          mockPath = mockPath.slice(0,-4)
          this.testData.method = 'put'
        } else if (mockPath.substr(-5) === '_post') {
          mockPath = mockPath.slice(0,-5)
          this.testData.method = 'post'
        } else if (mockPath.substr(-7) === '_delete') {
          mockPath = mockPath.slice(0,-7)
          this.testData.method = 'delete'
        } else {
          this.testData.method = ''
        }
      } else {
        this.testData.method = ''
        mockPath = item.file.slice(0,-3)
      }
      this.testData.path = mockPath
      this.showTest = true
    }
  }
}
</script>