<template>
  <div class="nav-body">
    <div v-for="item in menus" :key="item.id">
      <div class="nav-item" v-if="item.children">
        <div class="nav-item-title" @click="toggerNav(item.id)">
          {{item.title}}
          <i :class="item.id == activeMenu?'fa fa-angle-up':'fa fa-angle-down'" />
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
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .nav-sub {
    width: 100%;
    margin: 3px 0;
    &-item {
      position: relative;
      display: block;
      padding: 8px 16px;
      color: #969799;
      font-size: 13px;
      line-height: 1.5;
      background-color: #fff;
      &.on {
        background: $titleColor;
        color: white;
      }
    }
  }
  &.on {
    background: $titleColor;
    color: white;
  }
}
</style>