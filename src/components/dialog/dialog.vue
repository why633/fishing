<template>
  <div class="dialog" v-if="showDialog">
    <div class="dialog-mask"></div>
    <div class="dialog-container">
      <div class="dialog-content">
        <div class="dialog-content-top" v-text="msg"></div>
        <slot name="content"></slot>
        <div class="dialog-btn">
          <div v-if="btnNum==2" class="btn" @click="cancel">{{cancelBtnText}}</div>
          <div class="btn" @click="confirm">{{confirmBtnText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
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
  width: 8rem;
  position: absolute;
  border-radius: 0.26667rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.4rem;
}
.dialog-content {
  text-align: center;
  .dialog-content-top {
    margin-bottom: 0.26667rem;
  }
}
.dialog-btn {
  margin-top: 0.53333rem;
  display: flex;
  justify-content: space-around;
}
</style>
