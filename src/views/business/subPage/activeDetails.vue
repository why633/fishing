<template>
  <div class="activeDetails">
    <top-title :isBackPre="isBack" @backClick="closeWebview">报名情况</top-title>
    <!-- 头像，昵称，电话，报名时间，报名费用 -->
    <mescroll-vue ref="mescroll" :down="{use: false}">
      <div class="content">
        <div class="list-wrap">
          <div class="item" v-for="(item,index) in userData" :key="index">
            <div class="user-info">
              <div class="img-wrap">
                <img :src="$globalData.defaultHeadImg" v-imgplaceholder="item.headImg">
              </div>
              <div class="info-wrap">
                <div class="name">{{ item.nickName }}</div>
                <div class="text">联系电话：{{ item.phone }}</div>
                <div class="text">报名费用：{{ item.money }}元</div>
                <div class="text">报名时间：{{ item.enrollDate | formateDateTime }}</div>
              </div>
            </div>
            <div class="btn-box">
              <div class="collect-fish btn-blue" @click="goCollectFish(item.id)">一键收鱼</div>
              <div class="back-deposit btn-blue">退押金</div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { enrollUser } from '@/api'
export default {
  data () {
    return {
      isBack: true,
      errorImg: require('@/assets/defaultHeadImg.png'),
      userData: []
    }
  },
  created () {
    this.eventId = this.$route.query.id
    if (this.$route.query.from === 'app') {
      this.isBack = false
    }
    this.getUserData()
  },
  methods: {
    // 获取报名用户
    getUserData () {
      const params = {
        eventId: this.eventId
      }
      enrollUser(params).then(res => {
        this.userData = res.data.data
      })
    },
    // 跳转一键收鱼详情
    goCollectFish (id) {
      this.$router.push(`/business/collectFish?id=${id}`)
    },
    closeWebview () {
      this.$closeWebview()
    }
  }
}
</script>

<style lang="scss" scoped>
.activeDetails {
  min-height: 100%;
  background: #fff;
}
.content {
  padding-bottom: 1.66667rem;
  .list-wrap {
    padding: 0.4rem;
    .item{
      padding: .533333rem 0;
      border-bottom: 1px solid #efefef;
      &:last-child{
        border: none;
      }
      .user-info {
        display: flex;
        align-items: center;
        .img-wrap {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 0.26667rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info-wrap {
          .name {
            // line-height: 0.93333rem;
            margin-bottom: 0.186667rem;
            font-size: 0.4rem;
          }
          .text {
            margin-bottom: 0.08rem;
            color: #747474;
            font-size: .373333rem;
            .gray {
              color: #747474;
            }
          }
          .fee {
            color: red;
          }
          .seatNumber {
            display: inline-block;
            height: 0.666667rem;
            line-height: 0.666667rem;
            padding: 0 0.4rem;
            border: 1px solid #000;
            border-radius: 0.333333rem;
            color: rgba(11, 37, 67, 1);
            border: 1px solid rgba(11, 37, 67, 1);
          }
        }
      }
    }
  }
}
.btn-box {
  display: flex;
  width: 100%;
  padding: 0 1.813333rem;
  justify-content: space-between;
  background: #fff;
  margin-top: .266667rem;
  .btn-blue{
    width: auto;
    padding: 0 .533333rem;
    border-radius: .16rem;
    border-radius: .16rem;
    background: rgb(75, 175, 241);
  }
}
.phone-input {
  width: 70%;
  border: 1px solid #efefefcb;
  border-radius: 0.13333rem;
  outline: none;
  padding: 0.26667rem 0.13333rem;
  -webkit-appearance: none;
}
.img-box {
  display: inline-block;
  width: 2.66667rem;
  height: 2.66667rem;
  margin-top: 0.4rem;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
