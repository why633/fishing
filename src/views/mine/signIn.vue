<template>
  <div class="signIn">
    <top-title>签到领币</top-title>
    <div class="content">
      <div class="calendar-wrap">
        <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :markDate="signInDate"></Calendar>
        <div
          :class="[{'btn-active': isBtnActive, 'btn-disabled': btnDisabled}, 'signIn-btn']"
          @click="signToday"
        >签到</div>
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
import HandleToken from '@/utils/handleToken'
import { appSource } from '@/utils/appSource'
const handleToken = new HandleToken()
export default {
  data () {
    return {
      currentMonth: '', // 日历所在月份
      currentDay: '', // 当前
      signInDate: [], // 已签到日期
      isBtnActive: false,
      btnDisabled: false
    }
  },
  mounted () {
    if (appSource() === 'ios') {
      window['getToken'] = (result) => {
        alert(`${new Date()}:${result}`)
        this.setToken(result)
      }
    }
    if (appSource() === 'andriod') {
      alert(window.android.getToken())
      this.setToken(window.android.getToken())
    }
  },
  created () {
    this.$nextTick(() => {
      this.btnClickInit('.signIn-btn')
    })
    const currentDate = new Date()
    this.currentMonth = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1)
    this.currentDay = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()
    this.getCheckSign(this.currentMonth)
    console.log(this.currentDay)
  },
  methods: {
    clickDay (data) {
      // console.log(data) // 选中某天
    },
    changeDate (data) {
      const arr = data.split('/')
      this.currentMonth = arr[0] + '-' + arr[1]
      console.log(this.currentMonth)
      this.getCheckSign()
    },
    // 获取已签到数据
    getCheckSign () {
      checkSign({ date: this.currentMonth }).then(res => {
        console.log(res)
        const resData = res.data
        /* resData.data.map(item => {
          if (item === this.currentDay) {
            this.btnDisabled = true
          }
        }) */
        this.signInDate = resData.data
      })
    },
    // 今日签到
    signToday () {
      if (!this.btnDisabled) {
        signToday().then(res => {
          console.log(res)
          this.getCheckSign()
        })
      }
    },
    // 按钮点击效果
    btnClickInit (el) {
      const _this = this
      document.querySelector(el).addEventListener('touchstart', function () {
        _this.isBtnActive = true
      })
      document.querySelector(el).addEventListener('touchend', function () {
        _this.isBtnActive = false
      })
    },
    setToken (token) {
      handleToken.setToken(token)
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
.btn-active {
  background: rgba(255, 153, 0, 0.877) !important;
}
.btn-disabled {
  background: rgba(235, 223, 205, 0.959) !important;
}
</style>
