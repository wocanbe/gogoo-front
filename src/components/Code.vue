<template>
  <div class="vuecode" :style="styles">
    <textarea ref="vuecode" :style="styles" :value="cmVal" ></textarea>
  </div>
</template>

<script>
import creatCode from '../plugins/codemirror'
export default {
  props: {
    value: String,
    mode: {
      type: String,
      default: 'js'
    },
    width: String,
    height: String
  },
  data () {
    return {
      cmVal: this.value
    }
  },
  computed: {
    modeType () {
      if (this.mode === 'json') return 'application/json'
      else if (this.mode === 'js') return 'text/javascript'
      else return 'text/x-textile'
    },
    styles () {
      const ys = {}
      if (this.width) ys['width'] = this.width
      if (this.height) ys['height'] = this.height
      return ys
    }
  },
  mounted () {
    this.vueEditor = creatCode(this.$refs.vuecode, this.modeType)
    // 当输入框内容发生变化 更新value值
    this.vueEditor.on('change', cm => {
      const cmVal = cm.getValue()
      this.cmVal = cmVal
      this.$emit('changed', cmVal);
      this.$emit('input', cmVal);
    });
    this.$nextTick(() => {
      this.refresh() // 手动触发刷新
    })
  },
  methods: {
    refresh() {
      this.vueEditor && this.vueEditor.refresh()
    },
    setVal (val) {
      this.vueEditor && this.vueEditor.setValue(val);
    }
  }
}
</script>