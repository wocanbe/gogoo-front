<template>
  <div class="full">
    <header>Header</header>
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
  title: '服务器设置',
  path: '/server'
}, {
  id: '2',
  title: '模拟接口',
  path: '/mock'
}, {
  id: '3',
  title: '单个接口转发',
  path: '/single'
}, {
  id: '4',
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
      menus
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  height: 80px;
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
