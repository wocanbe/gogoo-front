<template>
  <div class="full">
    <header>
      Header
      <div class="select">
        <el-select v-model="selectServer" size="small" placeholder="请选择要管理的服务器" @change="changeServe">
          <el-option v-for="serve in servers" :key="serve.id" :label="serve.name" :value="serve"></el-option>
        </el-select>
      </div>
    </header>
    <div class="middle">
      <aside>
        <my-menus :menus="menus"></my-menus>
      </aside>
      <div class="main">
        <router-view />
      </div>
    </div>
    <footer>Footer</footer>
  </div>
</template>

<script>
import myMenus from '../components/Menus'
const menus = [{
  id: '1',
  title: '单个接口转发',
  path: '/single'
}, {
  id: '2',
  title: '组合接口转发',
  path: '/mult'
}]
export default {
  name: 'Main',
  components: {
    myMenus
  },
  data () {
    return {
      menus,
      servers: [],
      selectServer: undefined
    }
  },
  mounted () {
    this.getServer()
  },
  methods: {
    async getServer () {
      this.servers = await this.$ajax('getServe')
    },
    changeServe (item) {
      console.log(item);
      sessionStorage.setItem('serverid', item.id)
      sessionStorage.setItem('serverpath', item.path)
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  height: 80px;
  position: relative;
  .select {
    position: absolute;
    right: 20px;
    bottom: 12px;
  }
}
footer {
  position: absolute;
  width: 100%;
  height: 60px;
  bottom: 0;
}
header,footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.middle {
  position: absolute;
  width: 100%;
  top: 80px;
  bottom: 60px;
}

aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  width: 200px;
  height: 100%;
  float: left;
}
.main {
  margin-left: 200px;
  background-color: #e9eef3;
  color: #333;
  height: 100%;
  text-align: center;
  padding: 20px;
  overflow: auto;
}
</style>
