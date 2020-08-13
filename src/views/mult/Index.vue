<template>
  <div>
    <vxe-table :data="mockFiles">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="path" title="文件名"></vxe-table-column>
      <vxe-table-column type="seq" title="操作">
        <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()" title="添加"></i></span>
        </template>
        <template v-slot="{row}">
          <i class="operate fly-edit" @click="editEvent(row)" title="编辑"></i>
          <i class="operate fly-del" @click="delEvent(row)" title="删除"></i>
          <i class="operate fly-play" @click="runEvent(row)" title="运行"></i>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-dialog
      title="编辑mock代码"
      :visible.sync="showForm"
      width="60%"
      center>
      <codemirror v-model="formData.content"></codemirror>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showForm=false">取 消</el-button>
        <el-button type="primary" @click="saveMock">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import codemirror from '@/components/Code'
const defaultCode = '/**\n * 安全提示\n * 保存以后，不会再展示保存的代码，请提前备份好代码\n * 代码中不要出现require语句\n * 为了方便，代码会自动引入mockjs，可以直接使用\n */'
export default {
  name: 'Mult',
  components: {codemirror},
  data () {
    return {
      mockFiles: [],
      showForm: false,
      isAdd: false,
      isJson: false,
      formData: {
        file: '',
        content: defaultCode
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
    },
    addEvent () {
      this.formData.file = ''
      this.formData.content = defaultCode
      this.showForm = true
    },
    editEvent (item) {
      this.formData.file = item.path
      this.formData.content = defaultCode
      this.showForm = true
    },
    delEvent () {
      console.log(3)
    },
    runEvent () {
      console.log(4)
    }
  }
}
</script>