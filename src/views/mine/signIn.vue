<template>
  <div class="signIn">
    <top-title>签到领币</top-title>
    <div class="content">
      <Calendar
        v-on:choseDay="clickDay"
        v-on:changeMonth="changeDate"
        :futureDayHide="'0'"
        :markDate="signInDate"
      ></Calendar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signInDate: ['2019/11/13', '2019/11/19']
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
.content{
  padding: .533333rem .426667rem;
}
</style>
