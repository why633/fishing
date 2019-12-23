<template>
  <div class="article">
    <top-title :isBackPre="false" @backClick="closeWebview">文章详情</top-title>
    <mescroll-vue ref="mescroll" :down="{use: false}">
      <div class="info-wrap">
        <div class="title">{{ detailsInfo.title }}</div>
        <div class="user">
          <div class="item">
            <div class="avatar">
              <img :src="$globalData.defaultHeadImg" v-imgplaceholder="detailsInfo.userHeadImg">
            </div>
          </div>
          <div class="item">
            <div class="name">{{ detailsInfo.userNickName }}</div>
            <div class="date-time">{{ (detailsInfo.createTime)|formateDateTime }}</div>
          </div>
          <div class="item">
            <!-- <div class="btn">{{ detailsInfo.isLike==1?'已关注':'关注' }}</div> -->
          </div>
        </div>
        <div class="sign">
          {{ detailsInfo.content }}
          <div class="img-box">
            <img :src="detailsInfo.coverImage">
          </div>
        </div>
      </div>

      <div class="review-wrap">
        <div class="title">---- 用户评论 ----</div>
        <div class="list">
          <div class="item clear-fix" v-for="(item, index) in detailsInfo.commentList" :key="index">
            <div class="avatar left">
              <img :src="$globalData.defaultHeadImg" v-imgplaceholder="item.userHeadImg">
            </div>
            <div class="info left">
              <div class="name">{{item.userNickName}}</div>
              <div class="text">{{item.comment}}</div>
              <div class="date-time">{{item.createTime|formateDateTime}}</div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <div class="input-content" v-show="showInputFlag">
      <input
        ref="input"
        :class="[{'input-focus': isInput},'input']"
        v-model="publishText"
        @focus="inputFocus"
        @blur="inputBlur"
        type="text"
        placeholder="评论一下吧..."
      >
      <div v-if="!isInput">
        <span :class="[{'is-like':detailsInfo.isLike},'iconfont', 'icon-thumbup']" @click="isLike"></span>
        <span class="iconfont icon-xinbaniconshangchuan-"></span>
      </div>
      <div v-else class="publish-btn" @click="publish">
        <span>发布</span>
      </div>
    </div>
  </div>
</template>

<script>
import keyboardHandle from '@/utils/keyboardHandle'
import { fishCatchDetails, remarkFishCatch, likeFishCatch } from '@/api'
export default {
  data () {
    return {
      publishText: '', // 评论内容
      isInput: false, // 输入状态
      introduction: '',
      detailsInfo: {},
      showInputFlag: true
    }
  },
  created () {
    this.fishCatchId = this.$route.query.fishCatchId
    // 处理键盘弹起收起
    keyboardHandle()
    this.getFishCatchDetails()
    console.log(this.$globalData)
  },
  methods: {
    closeWebview () {
      this.$closeWebview()
      // console.log('closeWebview')
      // if (appSource() === 'ios') {
      //   App.popBack('popBack') // eslint-disable-line
      // }
      // if (appSource() === 'andriod') {
      //   console.log('andriod')
      //   window.android.closePage()
      // }
    },
    // input获取焦点事件
    inputFocus () {
      console.log('focus')
      this.isInput = true
    },
    // input失去焦点事件
    inputBlur () {
      let _this = this
      setTimeout(function () {
        _this.isInput = false
        // _this.showInputFlag = true
        console.log('blur')
      }, 50)
    },
    // 发布
    publish () {
      console.log(this.publishText)
      // this.showInputFlag = false
      if (this.publishText === '') {
        return false
      }
      const params = {
        fishCatchId: this.fishCatchId,
        comment: this.publishText
      }
      remarkFishCatch(JSON.stringify(params)).then(res => {
        console.log(res)
        fishCatchDetails({ fishCatchId: this.fishCatchId }).then(res => {
          this.detailsInfo.commentList = res.data.data.commentList
        })
      })
      this.publishText = ''
    },
    // 获取渔获详情
    getFishCatchDetails () {
      fishCatchDetails({ fishCatchId: this.fishCatchId }).then(res => {
        console.log(res)
        this.detailsInfo = res.data.data
      })
    },
    isLike () {
      likeFishCatch({ fishCatchId: this.fishCatchId }).then(res => {
        console.log(res)
        this.detailsInfo.isLike = !this.detailsInfo.isLike
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  min-height: 100vh;
  background: #fff;
  padding-bottom: 1.6rem;
}
.info-wrap {
  padding: 0.533333rem 0.4rem 0;
  .title {
    font-size: 0.373333rem;
    font-weight: 700;
    margin-bottom: 0.4rem;
  }
  .user {
    display: flex;
    align-items: center;
    font-size: 0.4rem;
    .item {
      &:first-child {
        width: 0.933333rem;
        height: 0.933333rem;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &:nth-child(2) {
        flex: 1;
        padding-left: 0.133333rem;
        .date-time {
          margin-top: 0.08rem;
          font-size: 0.293333rem;
          color: gray;
        }
      }
      .btn {
        color: gray;
        padding: 0.133333rem 0.213333rem;
        border: 1px solid gray;
        font-size: 0.346667rem;
      }
    }
  }
  .sign {
    margin-top: 0.4rem;
    .img-box {
      img {
        margin-top: 0.266667rem;
        width: 100%;
      }
    }
  }
}
.review-wrap {
  margin-top: 0.4rem;
  padding: 0 0.4rem 1.333333rem;
  .title {
    text-align: center;
  }
  .item {
    margin-top: 0.266667rem;
    margin-bottom: 0.533333rem;
    .avatar {
      width: 0.933333rem;
      height: 0.933333rem;
      border-radius: 50%;
      overflow: hidden;
      // background: pink;
      margin-right: 0.133333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      .name {
      }
      .text {
        margin: 0.133333rem 0;
      }
      .date-time {
        font-size: 0.293333rem;
        color: gray;
      }
    }
  }
}
.input-content {
  position: fixed;
  bottom: 0;
  height: 1.333333rem;
  width: 100%;
  background: #fff;
  padding: 0 0.4rem;
  border-top: 1px solid #efefef;
  .input {
    height: 0.8rem;
    width: 7.333333rem;
    margin-top: 0.266667rem;
    border-radius: 0.4rem;
    border: none;
    outline: none;
    padding: 0 0.266667rem;
    background: #efefef;
  }
  .input-focus {
    width: 8rem;
  }
  .publish-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.4rem;
  }
  .icon-thumbup {
    font-size: 0.8rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.2rem;
  }
  .is-like {
    color: #f16f41;
  }
  .icon-xinbaniconshangchuan- {
    font-size: 0.733333rem;
    position: absolute;
    top: 48%;
    right: 0.4rem;
    transform: translateY(-50%);
  }
}
.field-wrap {
  position: fixed;
  bottom: 0;
  width: 100%;
  .field {
    width: 100%;
    textarea {
      width: 100%;
    }
  }
}
</style>
