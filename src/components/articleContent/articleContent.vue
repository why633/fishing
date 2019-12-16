<template>
  <div class="articleContent">
    <div class="sub-title">{{ articleInfo.title }}</div>
    <div class="date-wrap clear-fix">
      <div class="date-time left">{{ articleInfo.createTime | formateDateTime }}</div>
      <div class="scan right">
        <span class="icon iconfont icon-eye"></span>
        <span class="num">{{articleInfo.times}}</span>
      </div>
    </div>
    <div class="text-content" v-html="articleInfo.content"></div>
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
          title: '',
          createTime: '',
          times: '',
          content: ''
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
  .date-wrap {
    margin-top: 0.4rem;
    font-size: 0.26667rem;
    .date-time {
    }
    .scan {
      .icon {
        width: 0.4rem;
        height: 0.26667rem;
        // background: pink;
        float: left;
        margin-right: 0.13333rem;
        font-size: .16rem;
      }
    }
  }
  .text-content {
    margin-top: 0.4rem;
    line-height: 1.2em;
    & >>> p{
      line-height: 1.2em;
    }
    & >>> img {
      width: 100% !important;
      margin: .133333rem 0;
    }
  }
}
</style>
