<template>
  <div class="signIn">
    <top-title>签到领币</top-title>
    <div class="content">
      <div class="calendar-wrap">
        <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :markDate="signInDate"></Calendar>
        <div class="signIn-btn">签到</div>
      </div>
      <div class="rule">
        <h3 class="title">规则说明</h3>
        <div class="text">签到奖励1排行币/天</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signInDate: ['2019/11/13', '2019/11/14', '2019/11/15', '2019/11/16', '2019/11/17', '2019/11/19']
    }
  },
  methods: {
    clickDay (data) {
      console.log(data) // 选中某天
    },
    changeDate (data) {
      console.log(data) // 左右点击切换月份
    }
  }
}
</script>

<style lang="scss" scoped>
.signIn {
  min-height: 100%;
  background: #fff;
}
.content {
  padding: 0.533333rem 0.426667rem;
  .calendar-wrap {
    box-shadow: 0 0.053333rem 0.213333rem 0 rgba(0, 0, 0, 0.12);
    border-radius: 0.133333rem;
    padding-bottom: 0.4rem;
    .signIn-btn {
      width: 8.133333rem;
      height: 1.173333rem;
      text-align: center;
      line-height: 1.173333rem;
      background: rgba(255, 153, 0, 1);
      border-radius: 0.106667rem;
      margin: 0.4rem auto 0;
      font-size: 0.426667rem;
      color: #fff;
    }
  }
  .rule {
    margin-top: .826667rem;
    .title{
      font-size: .426667rem;
      font-weight:500;
    }
    .text{
      margin-top: .48rem
    }
  }
}
</style>
