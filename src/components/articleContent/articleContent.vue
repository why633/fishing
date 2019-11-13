<template>
  <div class="articleContent">
    <div class="sub-title">{{ articleInfo.subTitle }}</div>
    <div class="date-wrap clear-fix">
      <div class="date-time left">2019-10-22 20:20</div>
      <div class="scan right">
        <span class="icon"></span>
        <span class="num">1234</span>
      </div>
    </div>
    <div class="text-content">为什么说钓鱼人不容易得老年痴呆，不知道你信不信为什么说钓鱼人不容易得老年痴呆，不知道你信不信为什么说钓鱼人不容易得老年痴呆，不知道你信不信</div>
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
  .date-wrap{
    margin-top: .4rem;
    font-size: .26667rem;
    .date-time{
    }
    .scan{
      .icon{
        display: block;
        width: .4rem;
        height: .26667rem;
        background: pink;
        float: left;
        margin-right: .13333rem;
      }
    }
  }
  .text-content{
    margin-top: .4rem;
    line-height: 1.2em;
  }
}
</style>
