<template>
  <div class="messageList">
    <top-title>{{ titleText }}</top-title>
    <div class="content">
      <div class="item">
        <div class="avator">
          <img :src="avator">
        </div>
        <div class="info">
          <div class="name">用户-asasdasda</div>
          <div class="text">
            关注了您
            <span>去主页看看</span>
          </div>
        </div>
        <div class="date-time">10月26日 14:30</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleText: '关注通知',
      avator: require('@/assets/avator2.jpeg')
    }
  },
  created () {
    if (this.$route.query.type === 'follow') {
      this.titleText = '关注通知'
    } else {
      this.titleText = '赛事/活动通知'
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 0.42667rem 0.42667rem;
  .item {
    padding: 0.42667rem 0;
    display: flex;
    .avator {
      width: 1.06667rem;
      height: 1.06667rem;
      border-radius: 50%;
      overflow: hidden;
      background: pink;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding: 0.08rem 0.21333rem;
      flex: 1;
      .text {
        font-size: 0.34667rem;
        color: #787878;
        margin-top: 0.18667rem;
      }
    }
    .date-time {
      padding-top: 0.08rem;
      font-size: 0.32rem;
      color: #787878;
    }
  }
}
</style>
