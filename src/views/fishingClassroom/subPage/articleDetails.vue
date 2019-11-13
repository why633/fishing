<template>
  <div class="articleDetails">
    <top-title>文章详情</top-title>
    <article-content></article-content>
  </div>
</template>
<script>
export default {
  name: 'articleDetails',
  data () {
    return {}
  },
  mounted () {
    console.log(this.$route.query)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.articleDetails{
  min-height: 100%;
  background: #fff;
}
.top-title {
  height: 1.386667rem;
  line-height: 1.386667rem;
  padding-left: 0.56rem;
  color: #fff;
  font-size: 0.42667rem;
}
</style>
