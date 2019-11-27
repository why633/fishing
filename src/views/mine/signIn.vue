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
import { checkSign, signToday } from '@/api/index'
export default {
  data () {
    return {
      currentMonth: '', // 日历所在月份
      signInDate: [] // 已签到日期
    }
  },
  created () {
    const currentDate = new Date()
    this.currentMonth = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1)
    this.getCheckSign(this.currentMonth)
  },
  methods: {
    clickDay (data) {
      // console.log(data) // 选中某天
    },
    changeDate (data) {
      console.log(data) // 左右点击切换月份
    },
    // 获取已签到数据
    getCheckSign () {
      checkSign({ date: this.currentMonth }).then(res => {
        console.log(res)
        const resData = res.data
        this.signInDate = resData.data
      })
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
    margin-top: 0.826667rem;
    .title {
      font-size: 0.426667rem;
      font-weight: 500;
    }
    .text {
      margin-top: 0.48rem;
    }
  }
}
</style>
