<template>
  <div>
    <vxe-table :data="mockFiles">
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="path" title="文件名"></vxe-table-column>
      <vxe-table-column type="seq" title="操作">
        <template v-slot:header>
          <span class="operate">操作 <i class="fly-add-s" @click="addEvent()"></i></span>
        </template>
        <template v-slot="{row}">
          <i class="operate fly-edit" @click="editEvent(row)"></i>
          <i class="operate fly-del" @click="delEvent(row)"></i>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'Mock',
  data () {
    return {
      mockFiles: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await this.$ajax('getMockList', {
        userid: 1,
        token: '60e8020a5f446391e24651280b122994a95dea0f',
        id: 1
      })
      this.mockFiles = res.map(item => {
        return { path: item }
      })
    },
    addEvent () {
      console.log(1)
    },
    editEvent () {
      console.log(2)
    },
    delEvent () {
      console.log(3)
    }
  }
}
</script>