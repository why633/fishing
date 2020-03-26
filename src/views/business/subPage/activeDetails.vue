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
                <div class="l">
                  <div class="name">{{ item.nickName }}</div>
                  <div class="text">联系电话：{{ item.phone }}</div>
                  <div class="text">报名费用：{{ item.money }}元</div>
                  <div class="text">报名时间：{{ item.enrollDate | formateDateTime }}</div>
                </div>
                <div class="r">
                  <div class="collect-fish new-btn" @click="goCollectFish(item.applicationId)">{{item.harvesting == 0?'一键收鱼':'已收鱼'}}</div>
                  <div v-if="item.prepay == 2" class="back-deposit new-btn" @click="backDeposit(item.applicationId, item.prepayMoney)">退押金</div>
                  <div v-if="item.prepay == 3" class="back-deposit new-btn">押金已退</div>
                </div>
              </div>
            </div>
            <!-- <div class="btn-box">
              <div class="collect-fish btn-blue" @click="goCollectFish(item.applicationId)">{{item.harvesting == 0?'一键收鱼':'已收鱼'}}</div>
              <div v-if="item.prepay == 2" class="back-deposit btn-blue" @click="backDeposit(item.applicationId, item.prepayMoney)">退押金</div>
              <div v-if="item.prepay == 3" class="back-deposit btn-disable">押金已退</div>
            </div> -->
          </div>
        </div>
        <div class="no-data" v-if="userData.length==0">暂无数据</div>
        <Dialog
          :showDialog="depositDialog"
          :msg="''"
          @close-dialog="closeDialog"
          @dialog-confirm="dialogConfirm"
        >
          <div slot="content" class="slot-content">
            <div class="confirm-text">押金将退还到对方个人账户</div>
            <span>押金:{{ prepayMoney }}元</span>
          </div>
        </Dialog>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { enrollUser, refundPrepay } from '@/api'
export default {
  data () {
    return {
      isBack: true,
      errorImg: require('@/assets/defaultHeadImg.png'),
      userData: [
        {
          nickName: 'why',
          phone: '17611162633',
          money: '200',
          enrollDate: '2020-03',
          harvesting: 0,
          prepay: 2
        },
        {
          nickName: '王海洋',
          phone: '17611162633',
          money: '200',
          enrollDate: '2020-03',
          harvesting: 0,
          prepay: 2
        }
      ],
      depositDialog: false,
      applicationId: '',
      prepayMoney: 0
    }
  },
  created () {
    this.eventId = this.$route.query.id
    if (this.$route.query.from === 'app') {
      this.isBack = false
    }
    // this.getUserData()
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
    },
    closeDialog () {
      this.depositDialog = false
    },
    backDeposit (id, prepayMoney) {
      this.applicationId = id
      this.prepayMoney = prepayMoney
      this.depositDialog = true
    },
    // 退押金Confirm
    dialogConfirm () {
      refundPrepay({applicationId: this.applicationId}).then(res => {
        this.depositDialog = false
        this.getUserData()
      }).catch(err => {
        console.log(err)
        this.depositDialog = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.activeDetails {
  min-height: 100%;
  background: #fff;
  color: #333;
}
.content {
  padding-bottom: 1.66667rem;
  .list-wrap {
    padding: .613333rem 0 .613333rem .213333rem;
    .item{
      .user-info {
        display: flex;
        align-items: center;
        .img-wrap {
          width: 1.786667rem;
          height: 1.786667rem;
          border-radius: 50%;
          overflow: hidden;
          margin-right: .426667rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .info-wrap {
          flex: 1;
          border-top: 1px solid #EBEDEF;
          padding: .32rem 0;
          font-family: PingFangSC-Medium;
          display: flex;
          .l{
            flex: 1;
          }
          .r{
            width: 2.426667rem;
            align-self: center;
          }
          .name {
            // line-height: 0.93333rem;
            margin-bottom: .24rem;
            font-size: .426667rem;
          }
          .text {
            margin-bottom: .186667rem;
            color: #939393;
            font-size: .32rem;
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
      &:last-child{
        .info-wrap{
          border-bottom: 1px solid #EBEDEF;
        }
      }
    }
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
.slot-content{
  padding: 0 .533333rem;
  box-sizing: border-box;
  font-size: .4rem;
  .confirm-text{
    margin-bottom: .4rem;
  }
}
.no-data{
  text-align: center;
}
.new-btn{
  width: 2.026667rem;
  height: .746667rem;
  line-height: .746667rem;
  text-align: center;
  border: 1px solid #1062C6;
  border-radius: .373333rem;
  font-family: PingFangSC-Medium;
  font-size: .32rem;
  color: #1062C6;
}
.collect-fish{
  margin-bottom: .346667rem;
}
</style>
