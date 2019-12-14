<template>
  <div class="draw">
    <top-title>抽号</top-title>
    <mescroll-vue ref="mescroll" :down="{use: false}">
      <div class="content">
        <div class="waitNum">待抽号人数：{{drawData.count}}人</div>
        <div class="list-wrap">
          <div class="item" v-for="(item,index) in drawData.userList" :key="index">
            <div class="img-wrap">
              <img :src="item.headImg?item.headImg:errorImg" />
            </div>
            <div class="name">{{ item.nickName }}</div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <div class="btn-box">
      <div class="btn" @click="showDialog=true">手机号添加</div>
      <div class="btn" @click="showQrDialog=true">二维码添加</div>
    </div>
    <Dialog
      :showDialog="showDialog"
      :msg="'输入手机号进行抽号'"
      @close-dialog="closeDialog"
      @dialog-confirm="dialogConfirm"
    >
      <span slot="content">
        <input type="number" class="phone-input" v-model="phone" placeholder="请输入手机号" />
      </span>
    </Dialog>
    <Dialog
      :showDialog="showQrDialog"
      :msg="'微信扫描二维码进行抽号'"
      :btnNum="'1'"
      :confirmBtnText="'关闭'"
      @dialog-confirm="closeQr"
    >
      <span slot="content">
        <div class="img-box">
          <img :src="qrUrl" alt srcset />
        </div>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { getDrawUser, lotNumber, getQr } from '@/api'
import HandleToken from '@/utils/handleToken'
import keyboardHandle from '@/utils/keyboardHandle'
const handleToken = new HandleToken()
export default {
  data () {
    return {
      drawData: {},
      errorImg: require('@/assets/defaultHeadImg.png'),
      showDialog: false,
      phone: '',
      showQrDialog: false,
      eventId: '',
      qrUrl: require('@/assets/qr.jpg')
    }
  },
  mounted () {
    // this.setToken('q7K3kYrYhOLNxD5IRtutvQ')
    // this.$getAppToken()
    this.getQrImg()
  },
  created () {
    this.eventId = this.$route.query.id
    this.getWaitUser()
    document.body.style.overflow = ''
  },
  methods: {
    setToken (token) {
      handleToken.setToken(token)
    },
    // 获取待摇号用户
    getWaitUser () {
      const params = {
        eventId: this.eventId
      }
      getDrawUser(params).then(res => {
        console.log(res)
        const resData = res.data.data
        this.drawData = resData
      })
    },
    // 获取小程序二维码
    getQrImg () {
      const params = {
        applicationCode: 1
      }
      getQr(params).then(res => {
        console.log(res.data.data.value)
        this.qrUrl = res.data.data.value ? res.data.data.value : this.qrUrl
      })
    },
    closeDialog () {
      this.phone = ''
      this.showDialog = false
      keyboardHandle()
    },
    dialogConfirm () {
      console.log(this.phone)
      if (this.phone === '') {
        this.$toast.show({
          text: '请输入手机号'
        })
        return
      }
      const params = {
        eventId: this.eventId,
        phone: this.phone
      }
      lotNumber(params).then(res => {
        console.log(res)
        this.$toast.show({
          text: '摇号成功'
        })
      })
      // this.showDialog = false
      keyboardHandle()
    },
    closeQr () {
      this.showQrDialog = false
    }
  }
}
</script>
<style lang="scss" scoped>
.draw {
  min-height: 100%;
  background: #fff;
}
.content {
  padding-bottom: 1.66667rem;
  .waitNum {
    height: 1.33333rem;
    line-height: 1.33333rem;
    padding: 0 0.4rem;
    border-bottom: 1px solid #ebebeb;
    font-size: 0.4rem;
    font-weight: 600;
  }
  .list-wrap {
    padding: 0.4rem;
    .item {
      display: flex;
      margin-bottom: 0.4rem;
      .img-wrap {
        width: 0.93333rem;
        height: 0.93333rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.26667rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        line-height: 0.93333rem;
      }
    }
  }
}
.btn-box {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  padding: 0.26667rem 0.8rem 0.53333rem;
  justify-content: space-around;
  background: #fff;
  .btn {
    width: 3.73333rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    background: rgba(50, 50, 253, 0.993);
    border-radius: 0.5rem;
    color: #fff;
  }
}
.phone-input {
  width: 70%;
  border: 1px solid #ebebeb;
  border-radius: 0.13333rem;
  outline: none;
  padding: 0.26667rem 0.13333rem;
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
