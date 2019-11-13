<template>
  <div class="articleContent">
    <div class="sub-title">{{ articleInfo.subTitle }}</div>
    <div class="date-wrap">
      <div class="date-time"></div>
      <div class="scan">
        <span class="icon"></span>
        <span class="num"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 文章列表数据
    articleInfo: {
      type: Object,
      default: function () {
        return {
          subTitle: '为什么说钓鱼人不容易得老年痴呆，不知道你信不信'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.articleContent {
  padding: 0.56rem 0.42667rem;
  .sub-title {
    font-size: 0.4rem;
    font-weight: 700;
    line-height: 1.2em;
  }
}
</style>
