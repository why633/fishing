<template>
  <div class="number-grow-warp">
    <span :class="['_' + bitNum,'number-grow']"></span>
    <span :class="['_' + tenBitNum,'number-grow']"></span>
    <span :class="['_' + hundredBitNum,'number-grow']"></span>
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
      console.log('step:' + step.toFixed(0))
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
        console.log(current.split(''))
        _this.currentNum = current
        const a = current.split('')[0] // 第1位数
        const b = current.split('')[1] // 第2位数
        const c = current.split('')[2] // 第3位数
        _this.bitNum = a
        _this.tenBitNum = b
        _this.hundredBitNum = c
        // if (a < 10) {
        //   _this.bitNum = a
        // } else if (b < 10) {

        // }
        console.log(a, b, c)
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
  width: 1.333333rem;
  height: 1.333333rem;
}
._0{
  background: url('./images/0.png');
  background-size: 100% 100%;
}
._1{
  background: url('./images/1.png');
  background-size: 100% 100%;
}
._2{
  background: url('./images/2.png');
  background-size: 100% 100%;
}
._3{
  background: url('./images/3.png');
  background-size: 100% 100%;
}
._4{
  background: url('./images/4.png');
  background-size: 100% 100%;
}
._5{
  background: url('./images/5.png');
  background-size: 100% 100%;
}
._6{
  background: url('./images/6.png');
  background-size: 100% 100%;
}
._7{
  background: url('./images/7.png');
  background-size: 100% 100%;
}
._8{
  background: url('./images/8.png');
  background-size: 100% 100%;
}
._9{
  background: url('./images/9.png');
  background-size: 100% 100%;
}

</style>
