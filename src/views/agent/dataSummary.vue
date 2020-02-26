<template>
  <div class="dataSummary">
    <top-title :isBackPre="isBack" @backClick="closeWebview">钓场数据</top-title>
    <div class="content">
      <div class="item">
        <Grow :value="6" />
        <div class="text">签约钓场数量</div>
        <div class="num">4个</div>
      </div>
      <div class="item">
        <Grow :value="80" />
        <div class="text">赛事场次</div>
        <div class="num">12场</div>
      </div>
      <div class="item">
        <Grow :value="16" />
        <div class="text">活动场次</div>
        <div class="num">20场</div>
      </div>
      <div class="item">
        <Grow :value="63" />
        <div class="text">参赛人数</div>
        <div class="num">160人</div>
      </div>
    </div>
    <!-- <Grow :value="100" /> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      isBack: false
    }
  },
  methods: {
    closeWebview () {
      this.$closeWebview()
    }
  }
}
</script>

<style lang="scss" scoped>
.dataSummary{
  height: 100%;
  background: #151530;
  position: relative;
}
.content{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  // padding: 0 .4rem;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  .item{
    text-align: center;
    width: 45%;
    color: #ffffff;
    &:nth-child(1),&:nth-child(2){
      margin-bottom: 2rem;
    }
    .text{
      margin-top: .933333rem;
      margin-bottom: .213333rem;
    }
  }
}
</style>
