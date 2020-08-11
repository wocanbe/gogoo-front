<template>
  <div id="app" v-loading="loading">
    <el-dialog
      :title="errType"
      :visible="!!errMsg"
      @confirm="setErrMsg('')"
      center>
      {{errMsg}}
    </el-dialog>
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['loading', 'errType', 'errMsg'])
  },
  methods: {
    ...mapMutations(['setErrMsg'])
  }
}
</script>
