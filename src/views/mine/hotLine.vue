<template>
  <div class="hotLine">
    <top-title>客服热线</top-title>
    <div class="content">
      <div class="phone">客户服务热线：13810347506</div>
      <div class="text">如您在使用钓鱼排行榜app中有任何操作，支付问题或是反馈软件bug，请联系客服人员；感谢您对钓鱼排行榜的支持，我们回聆听您的宝贵意见并及时优化软件</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hotLine',
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.hotLine {
  min-height: 100%;
  background: #fff;
}
.content {
  padding: 0.533333rem 0.426667rem;
  .text{
      margin-top: .533333rem;
      line-height: 1.3em;
  }
}
</style>
