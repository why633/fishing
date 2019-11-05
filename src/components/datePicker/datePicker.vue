<template>
  <div class="datePicker">
    <vuescroll :ops="ops" class="scroll-wrap" ref="vs" @handle-scroll="handleScroll">
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
      <div class="scroll-item">内容1</div>
    </vuescroll>
    <vuescroll :ops="ops" class="scroll-wrap">
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
      <div class="scroll-item">内容2</div>
    </vuescroll>
  </div>
</template>

<script>
import vuescroll from 'vuescroll/dist/vuescroll-slide'
import 'vuescroll/dist/vuescroll.css'
export default {
  data () {
    return {
      ops: {
        vuescroll: {
          mode: 'slide'
        },
        scrollPanel: {
          scrollingX: false
        },
        rail: {
        },
        bar: {
          opacity: 0
        }
      }
    }
  },
  components: {
    vuescroll
  },
  created () {
    this.$nextTick(function () {
      const { v, h } = this.$refs['vs'].getScrollProcess()
      console.log(v, h)
    })
  },
  methods: {
    handleScroll (vertical, horizontal, nativeEvent) {
      console.log(vertical)
    }
  }
}
</script>
<style lang="scss" scoped>
.datePicker {
  height: 4rem;
  display: flex;
  .scroll-wrap {
    flex: 1;
    .scroll-item {
      text-align: center;
      height: 0.66667rem;
      line-height: 0.66667rem;
    }
  }
}
</style>
