<template>
  <div class="articleDetails">
    <div class="top-title title-color">
      <span class="iconfont icon-back" @click="goBack"></span>
      文章详情
    </div>
    <div class="content">
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
      <div>swrwqewqewqe</div>
    </div>
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
.top-title {
  height: 1.386667rem;
  line-height: 1.386667rem;
  padding-left: 0.56rem;
  color: #fff;
  font-size: 0.42667rem;
}
</style>
