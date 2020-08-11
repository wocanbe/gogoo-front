<template>
  <div>模拟接口</div>
</template>

<script>
export default {
  name: 'Mock',
  data () {
    return {}
  },
  methods: {
    async getCheckCode () {
      const res = await this.$ajax('getMockList', {
        userid: 1,
        token: 'f3fe129a13e51f280a7169b8e9a44c8e2f8921ae',
        id: 1
      })
      console.log(res)
    }
  }
}
</script>