<template>
  <div class="nav-body">
    <div v-for="item in menus" :key="item.id">
      <div class="nav-item" v-if="item.children">
        <div class="nav-item-title" @click="toggerNav(item.id)">
          {{item.title}}
          <i :class="item.id == activeMenu?'fly-up-a':'fly-down-a'" />
        </div>
        <div class="nav-sub" v-show="item.id == activeMenu">
          <router-link
            class="nav-sub-item"
            v-for="chi in item.children"
            :key="chi.id"
            :to="{path:chi.path}"
          >{{chi.title}}</router-link>
        </div>
      </div>
      <router-link class="nav-item nav-item-title" v-else :to="{path:item.path}">{{item.title}}</router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    menus: Array
  },
  data () {
    return {
      activeMenu: ''
    }
  },
  methods: {
    toggerNav (id) {
      if (this.activeMenu === id) this.activeMenu = ''
      else this.activeMenu = id
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-item {
  display: block;
  position: relative;
  &-arrow {
    float: right;
    margin-top: 4px;
  }
  &-title {
    padding: 10px 16px;
    overflow: hidden;
    color: $景泰蓝;
    font-size: 14px;
    line-height: 24px;
    background-color: $象牙白;
    border-bottom: 1px solid $珍珠灰;
  }
  .nav-sub {
    width: 100%;
    margin: 3px 0;
    &-item {
      position: relative;
      display: block;
      padding: 8px 16px;
      color: $瀑布蓝;
      font-size: 13px;
      line-height: 1.5;
      background-color: $象牙白;
      &.on {
        background: $瀑布蓝;
        color: $象牙白;
      }
    }
  }
  &.on {
    background: $景泰蓝;
    color: $象牙白;
  }
}
</style>