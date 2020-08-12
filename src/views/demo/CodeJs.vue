<template>
  <div>
    <codemirror ref="jscode" v-model="code" />
  </div>
</template>

<script>
import codemirror from '@/components/Code'
export default {
  components: {codemirror},
  data() {
    return {
      code: `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}`
    }
  }
}
</script>