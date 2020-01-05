<template>
  <div class="ranking">
    <top-title :isBackPre="false" @backClick="closeWebview">赛事排名查询</top-title>
    <div class="content">
      <div class="item">
        <div class="icon">
          <img :src="icon1" alt />
        </div>
        <div class="text">
          <div>中国休闲垂钓协会</div>
          <span>会员赛事排名查询 ></span>
        </div>
      </div>
      <div class="item">
        <div class="icon icon2">
          <img :src="icon2" alt />
        </div>
        <div class="text">
          <div>中国钓鱼运动协会<br>舟钓委员会</div>
          <span>会员赛事排名查询 ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      icon1: require('@/assets/ranking-icon1.png'),
      icon2: require('@/assets/ranking-icon2.png')
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
.ranking {
  min-height: 100%;
  background: #fff;
}
.content {
  padding: 0.933333rem 0;
  .item {
    width: 9.04rem;
    height: 5.586667rem;
    background: #fff;
    box-shadow: 0 0.053333rem 0.106667rem 0 #979797;
    margin: 0.8rem auto;
    display: flex;
    align-items: center;
    padding: 0 0.4rem;
    .icon {
      width: 3.2rem;
      height: 3.04rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .icon2 {
      height: 3.493333rem;
    }
    .text {
      font-size: .48rem;
      line-height: 1.5em;
      span {
        font-size: 0.32rem;
      }
    }
  }
}
</style>
