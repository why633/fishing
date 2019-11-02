<template>
  <div class="topTitle">
    <div class="title title-color">
      <span class="iconfont icon-back" @click="backClickHandle"></span>
      <span class="title-text"><slot>{{ title }}</slot></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    // 点击返回按钮时是否返回上一级 传入false时需传入backClickFunc（要执行的方法）
    isBackPre: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {

    }
  },
  methods: {
    backClickHandle () {
      if (this.isBackPre) {
        this.$router.go(-1)
      } else {
        this.$emit('backClick')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 1.17333rem;
  line-height: 1.17333rem;
  color: #fff;
  padding-left: 0.4rem;
  background: #0c3255;
  position: relative;
  .icon-back{
    font-size: .48rem;
    position: absolute;
    top: 51.5%;
    transform: translateY(-50%);
  }
  .title-text{
    padding-left: .8rem;
  }
}
</style>
