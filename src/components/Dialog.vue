<template>
  <el-dialog
    :title="title"
    :visible="show"
    @close="toCancel"
    width="60%"
    center>
    <slot></slot>
    <span v-if="showBtn" slot="footer" class="dialog-footer">
      <el-button @click="toCancel">取 消</el-button>
      <el-button type="primary" @click="toConfirm">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: String
    },
    show: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toConfirm () {
      this.$emit('confirm', true)
    },
    toCancel () {
      this.$emit('update:show', false)
    }
  }
}
</script>