<template>
  <div class="billDetails">
    <top-title>账单明细</top-title>
    <div class="date-picker">选择日期</div>
    <div class="bill-list">
      <div class="item">
        <div class="left-info">
          <div class="title">
            充值
            <span class="sub-title">（钱包充值）</span>
          </div>
          <div class="date">19 11月01日 11:05</div>
        </div>
        <div class="right-info">
          <span>0.01</span>
        </div>
      </div>
    </div>
    <date-picker></date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pickerValue: ''
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.billDetails {
  min-height: 100vh;
  background: #fff;
}
.date-picker {
  height: 1.17333rem;
  background: #efefef;
}
.bill-list {
  padding: 0 0.266667rem 0 0.4rem;
  .item {
    display: flex;
    padding: 0.4rem 0 0.266667rem 0;
    border-bottom: 1px solid #efefef;
    align-items: center;
    .left-info {
      flex: 1;
      .title {
        margin-bottom: 0.266667rem;
        .sub-title {
          font-size: 0.32rem;
        }
      }
      .date {
        font-size: 0.32rem;
        color: gray;
      }
    }
    .right-info {
      max-width: 3.333333rem;
      padding: 0 0.213333rem;
      text-align: center;
      font-size: 0.48rem;
      word-wrap: break-word;
    }
  }
}
</style>
