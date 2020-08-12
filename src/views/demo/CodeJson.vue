<template>
  <div>
    <!-- Or manually control the data synchronization -->
    <codemirror
      ref="cmEditor"
      :value="code"
      mode="json"
      @input="onCmCodeChange"
    />
  </div>
</template>

<script>
import codemirror from '@/components/Code'
export default {
  components: {codemirror},
  data() {
    return {
      code: '{"aa":"bb"}'
    };
  },
  methods: {
    onCmCodeChange(newCode) {
      console.log("this is new code", newCode);
      this.code = newCode;
    }
  }
};
</script>