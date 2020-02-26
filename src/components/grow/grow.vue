<template>
  <div class="number-grow-warp">
    <span class="over-icon"></span>
    <span :class="['_' + bitNum,'number-grow']"></span>
    <span v-show="tenBitNum" :class="['_' + tenBitNum,'number-grow']"></span>
    <span v-show="hundredBitNum" :class="['_' + hundredBitNum,'number-grow']"></span>
    <span class="per-icon"></span>
  </div>
</template>
<script>
export default {
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      currentNum: 0,
      bitNum: '',
      tenBitNum: '',
      hundredBitNum: ''
    }
  },
  methods: {
    numberGrow (ele) {
      let _this = this
      let step = (_this.value * 100) / (_this.time * 1000)
      let current = 0
      let start = 0
      let t = setInterval(function () {
        start += step
        if (start > _this.value) {
          clearInterval(t)
          start = _this.value
          t = null
        }
        if (current === start) {
          return
        }
        current = start.toFixed(0)
        _this.currentNum = current
        const a = current.split('')[0] // 第1位数
        const b = current.split('')[1] ? current.split('')[1] : '' // 第2位数
        const c = current.split('')[2] ? current.split('')[2] : '' // 第3位数
        _this.bitNum = a
        _this.tenBitNum = b
        _this.hundredBitNum = c
      }, 50)
    }
  },
  mounted () {
    this.numberGrow(this.$refs.numberGrow)
  }
}
</script>

<style>
.number-grow {
  display: inline-block;
  width: .8rem;
  height: 1.333333rem;
}
.per-icon{
  display: inline-block;
  width: .8rem;
  height: 1.333333rem;
  background: url('./images/per.png') center;
  background-size: 130% 130%;
}
.over-icon{
  display: inline-block;
  width: .666667rem;
  height: 1.333333rem;
  background: url('./images/over_icon.png') center;
  background-size: 200% 100%;
}
._0{
  background: url('./images/0.png') center;
  background-size: 160% 100%;
}
._1{
  background: url('./images/1.png') center;
  background-size: 160% 100%;
}
._2{
  background: url('./images/2.png') center;
  background-size: 160% 100%;
}
._3{
  background: url('./images/3.png') center;
  background-size: 160% 100%;
}
._4{
  background: url('./images/4.png') center;
  background-size: 160% 100%;
}
._5{
  background: url('./images/5.png') center;
  background-size: 160% 100%;
}
._6{
  background: url('./images/6.png') center;
  background-size: 160% 100%;
}
._7{
  background: url('./images/7.png') center;
  background-size: 160% 100%;
}
._8{
  background: url('./images/8.png') center;
  background-size: 160% 100%;
}
._9{
  background: url('./images/9.png') center;
  background-size: 160% 100%;
}

</style>
