<template>
  <div class="dialog">
    <div class="dialog-mask" v-show="showDialog"></div>
    <transition name="fadeIn">
      <div class="dialog-container" v-show="showDialog" :style="{ width: width }">
        <div class="dialog-content">
          <div class="dialog-content-top" v-text="msg"></div>
          <slot name="content"></slot>
          <div class="dialog-btn">
            <div v-show="btnNum==2" class="btn" @click="cancel">{{cancelBtnText}}</div>
            <div class="btn" @click="confirm">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '60%'
    },
    msg: {
      type: String,
      default: '提示'
    },
    btnNum: {
      type: String,
      default: '2'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
    }
  },
  watch: {
    showDialog (val) {
      console.log(val)
      this.showFlag = val
      if (val) {
        document.body.style.overflow = 'hidden'
        document.addEventListener('touchmove', this.bodyScroll, false) // 禁止页面滑动
      } else {
        document.body.style.overflow = '' // 出现滚动条
        document.removeEventListener('touchmove', this.bodyScroll, false)
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('close-dialog')
    },
    confirm () {
      this.$emit('dialog-confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
/*对话框style*/
.dialog {
}
.dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.dialog-container {
  background: #fff;
  // width: 8rem;
  position: absolute;
  border-radius: 0.26667rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 0.4rem;
}
.dialog-content {
  text-align: center;
  .dialog-content-top {
    margin-bottom: 0.26667rem;
  }
}
.dialog-btn {
  margin-top: 0.53333rem;
  border-top: 1px solid #f4f4f4;
  display: flex;
  justify-content: space-around;
  display: flex;
  .btn {
    height: 1.066667rem;
    line-height: 1.066667rem;
    flex: 1;
    // background: pink;
    &:first-child {
      border-right: 1px solid #f4f4f4;
    }
  }
}
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.3s;
}
.fadeIn-enter,
.fadeIn-leave-active {
  opacity: 0;
}
.translate-top-enter-active,
.translate-top-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-top-enter,
.translate-top-leave-active {
  transform: translateY(-50%);
  opacity: 0;
}
.translate-middle-enter-active,
.translate-middle-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-middle-enter,
.translate-middle-leave-active {
  transform: translateY(80%);
  opacity: 0;
}
.translate-bottom-enter-active,
.translate-bottom-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-bottom-enter,
.translate-bottom-leave-active {
  transform: translateY(100%);
  opacity: 0;
}
</style>
