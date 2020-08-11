<template>
  <div class="vuecode">
    <textarea ref="vuecode" :value="cmVal" ></textarea>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/ayu-dark.css'
import 'codemirror/mode/javascript/javascript.js'
export default {
  props: {
    value: String,
    mode: {
      type: String,
      default: 'javascript'
    }
  },
  data () {
    return {
      cmVal: this.value
    }
  },
  computed: {
    modeType () {
      if (this.mode === 'json') return 'application/json'
      else return 'text/javascript'
    }
  },
  mounted () {
    this.vueEditor = CodeMirror.fromTextArea(this.$refs.vuecode, {
      mode: this.modeType,
      tabSize: 2,
      theme: 'ayu-dark',
      lineNumbers: true,
      line: true,
      autoRefresh: true,
      styleActiveLine: true,
      matchBrackets: true
    })
    // 将json文件格式化显示
    // this.vueEditor.setValue(this.value);
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
      this.vueEditor && this.vueEditor.refresh();
    }
  }
}
</script>