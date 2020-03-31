<template>
  <div>
    <div class="topTitle">
      <div class="title title-color">
        <span class="iconfont icon-back" @click="backClickHandle"></span>
        <span class="title-text">
          <slot>{{ title }}</slot>
        </span>
        <span v-if="rightVisible" class="right-wrap" @click="pick"><span class="icon-dis"></span>{{distance}}<span class="icon-arr a-down"></span></span>
        <span v-if="shearVisible" class="shear-icon" @click="shear"></span>
      </div>
    </div>
    <div class="blank"></div>
    <picker
      :data="pickData"
      :showToolbar="true"
      @cancel="cancel"
      @confirm="confirm"
      :visible.sync="pickerVisible"
    />
  </div>
</template>

<script>
import { appSource } from '@/utils/appSource'
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
    },
    // 右侧距离选择块是否显示
    rightVisible: {
      type: Boolean,
      default: false
    },
    // 分享按钮
    shearVisible: {
      type: Boolean,
      default: false
    },
    shearOpt: {
      type: Object,
      default: function () {
        return {
          title: '',
          description: '',
          imgUrl: ''
        }
      }
    }
  },
  data () {
    return {
      pickerVisible: false,
      pickData: [
        [
          {
            label: '5km内',
            value: '5'
          },
          {
            label: '10km内',
            value: '10'
          },
          {
            label: '20km内',
            value: '20'
          }
        ]
      ],
      distance: '5km内',
      shearOption: {}
    }
  },
  watch: {
  },
  created () {
  },
  methods: {
    backClickHandle () {
      if (this.isBackPre) {
        this.$router.go(-1)
      } else {
        this.$emit('backClick')
      }
    },
    pick () {
      this.pickerVisible = true
    },
    cancel () {
      this.result = 'click cancel result: null'
    },
    confirm (res) {
      this.distance = res[0].label
      this.$emit('pickDistance', res)
    },
    shear () {
      const href = window.location.href + '&from=shear'
      console.log(href)
      if (appSource() === 'ios') {
        App.articleShare(href, this.shearOpt.title, this.shearOpt.description, this.shearOpt.imgUrl) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        window.android.startToShare(href, this.shearOpt.title, this.shearOpt.description, this.shearOpt.imgUrl)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.topTitle {
  position: fixed;
  width: 100%;
  z-index: 10;
}
.blank {
  height: 1.44rem;
}
.title {
  height: 1.44rem;
  line-height: 1.44rem;
  padding-left: 0.4rem;
  // background: #0c3255;
  background: #52A5D4;
  position: relative;
  font-family: PingFangSC-Medium;
  color: #FFFFFF;
  .icon-back {
    // font-size: .48rem;
    position: absolute;
    top: 51.5%;
    transform: translateY(-50%);
  }
  .title-text {
    display: block;
    text-align: center;
    font-size: .48rem;
  }
  .right-wrap{
    position: absolute;
    right: 0;
    top: 0;
    font-size: .426667rem;
    padding: 0 .533333rem;
    margin-right: .533333rem;
    .icon-dis{
      position: absolute;
      left: 0.08rem;
      top: 50%;
      transform: translateY(-50%);
      width: .346667rem;
      height: .346667rem;
      background: url('./images/distance.png');
      background-size: 100% 100%;
    }
    .icon-arr{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: .6rem;
      height: .6rem;
      margin-left: .133333rem;
    }
    .a-up{
      background: url('./images/up_arrow.png');
      background-size: 100% 100%;
    }
    .a-down{
      background: url('./images/down_arrow.png');
      background-size: 100% 100%;
    }
  }
}
.shear-icon{
  display: inline-block;
  width: .8rem;
  height: .8rem;
  background: url('./images/shear_icon.png');
  background-size: 100% 100%;
  position: absolute;
  right: .533333rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
