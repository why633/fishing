<template>
  <div class="activeList">
    <top-title :isBackPre="false" @backClick="closeWebview">赛事/活动</top-title>
    <mescroll-vue ref="mescroll" :down="{use: false}">
      <div class="content" id="dataList">
        <div
          class="item"
          v-for="(item, index) in activeList"
          :key="index"
          @click="goDetails(item.id,item.type)"
        >
          <div class="img-wrap">
            <img :src="item.coverImage" />
            <div :class="[item.type==1?'active':'game','type']">{{item.type==1?'活动':'赛事'}}</div>
            <div
              :class="[item.spotType == '1' ? 'heikeng' : (item.spotType == '2' ? 'luya': ( item.spotType == '4' ? 'haidiao' : (item.spotType == '3' ? 'ziran' : ''))),'sport-type']"
            >{{ item.spotType == '1' ? '黑坑' : (item.spotType == '2' ? '路亚': ( item.spotType == '4' ? '海钓' : (item.spotType == '3' ? '自然水域':'')))}}</div>
            <div :class="[item.isPast?'end':'going','past']">{{ item.isPast? '已过期' : '报名中' }}</div>
            <!-- <div
              class="del"
              v-if="type=='1'"
              @click.stop="cancleEvent(item.id, index)"
            >取消</div> -->
          </div>
          <div class="info">
            <div class="name">{{item.name}}</div>
            <div class="b-text">
              <div class="start-date">开始时间：{{item.startTime|formateDate}}</div>
              <div class="sate">钓位：{{item.enrollCount}}/{{item.peopleNumber}}</div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
    <Dialog
      :showDialog="showDialog"
      :msg="''"
      @close-dialog="closeDialog"
      @dialog-confirm="dialogConfirm"
    >
      <span slot="content">
        <span class="confirm-text">确认取消活动吗？</span>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { appSource } from '@/utils/appSource'
import { getEventList, delEvent } from '@/api'
import { formateDate } from '@/utils/formateDate'
import keyboardHandle from '@/utils/keyboardHandle'
export default {
  data () {
    return {
      type: '', // 1更多 2抽号
      eventId: '',
      delIndex: 0,
      activeList: [],
      showDialog: false
    }
  },
  filters: {
    formateDate: function (value) {
      const parmas = {
        dateObj: value,
        fmt: 'MM/dd'
      }
      return formateDate(parmas)
    }
  },
  mounted () {
    this.type = this.$route.query.type
    this.$getAppToken()
  },
  created () {
    this.getEventList()
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      console.log('up')
      const _this = this
      // 数据渲染成功后,隐藏下拉刷新的状态
      setTimeout(function () {
        _this.getEventList(page.num).then(res => {
          _this.$nextTick(() => {
            mescroll.endSuccess(res)
          })
        }).catch(err => {
          console.log(err)
          mescroll.endErr()
        })
      }, 200)
    },
    closeWebview () {
      console.log('closeWebview')
      this.$closeWebview()
      // if (appSource() === 'ios') {
      //   App.popBack('popBack') // eslint-disable-line
      // }
      // if (appSource() === 'andriod') {
      //   console.log('andriod')
      //   window.android.closePage()
      // }
    },
    // 获取赛事活动列表
    getEventList (pageNo) {
      return new Promise((resolve, reject) => {
        const params = {
          pageNo: pageNo
        }
        getEventList(params).then(res => {
          console.log(res)
          const resData = res.data.data
          this.activeList = pageNo === 1 ? resData : this.activeList.concat(resData)
          resolve(resData.length)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    },
    goDetails (id, eventType) {
      this.$router.push(`/agentCollectFish/activeDetails?id=${id}`)
    },
    goAppDetails (id, eventType) {
      if (appSource() === 'ios') {
        App.look(id, eventType) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        // 传id和 type给app
        window.android.look(id, eventType)
      }
    },
    closeDialog () {
      this.showDialog = false
      keyboardHandle()
    },
    dialogConfirm () {
      delEvent({ eventId: this.eventId }).then(res => {
        console.log(res)
        this.activeList.splice(this.delIndex, 1)
        this.$toast.show({
          text: '取消成功'
        })
      }).catch(err => {
        console.log(err)
      })
      this.showDialog = false
      keyboardHandle()
    },
    cancleEvent (id, index) {
      this.eventId = id
      this.delIndex = index
      this.showDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
.activeList {
  min-height: 100%;
  background: #fff;
}
.content {
  padding: 0.4rem;
  .item {
    position: relative;
    margin-bottom: 0.4rem;
    border-radius: 0.106667rem 0.106667rem 0 0;
    overflow: hidden;
    box-shadow: 0 0.053333rem 0.213333rem 0 rgba(0, 0, 0, 0.12);
    .draw-btn {
      position: absolute;
      top: 1.2rem;
      left: 50%;
      transform: translate(-50%, 0);
      z-index: 1;
      padding: 0.3rem 0.53333rem;
      background: #017ed2;
      color: #fff;
      border-radius: 0.13333rem;
    }
    .img-wrap {
      position: relative;
      width: 100%;
      height: 4rem;
      // background: pink;
      border-radius: 0.106667rem;
      overflow: hidden;
      img {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
      .type {
        position: absolute;
        color: #ffffff;
        font-size: 0.186667rem;
        top: 0.213333rem;
        padding: 0.08rem 0;
        left: 0.213333rem;
        border-radius: 0.053333rem;
        text-align: center;
        width: 1.066667rem;
      }
      .active {
        background: #f16f41;
      }
      .game {
        background: #017ed2;
      }
      .past {
        position: absolute;
        color: #ffffff;
        font-size: 0.186667rem;
        top: 0.213333rem;
        padding: 0.08rem 0;
        left: 1.6rem;
        border-radius: 0.053333rem;
        text-align: center;
        width: 1.066667rem;
      }
      .going {
        background: #0ec254;
      }
      .end {
        background: #989aa2;
      }
      .sport-type {
        position: absolute;
        color: #ffffff;
        font-size: 0.186667rem;
        top: 0.213333rem;
        padding: 0.08rem 0;
        left: 3.013333rem;
        border-radius: 0.053333rem;
        text-align: center;
        width: 1.066667rem;
      }
      .heikeng {
        background: #6a7a8b;
      }
      .luya {
        background: #ff6600;
      }
      .haidiao {
        background: #0075f6;
      }
      .ziran {
        background: #00cd99;
      }
      .game {
        background: #017ed2;
      }
      .del {
        position: absolute;
        top: 0.213333rem;
        right: 0;
        color: #fff;
        padding: 0.08rem 0.1rem;
        background: red;
      }
    }
    .info {
      padding: 0.266667rem;
      .name {
        margin-bottom: 0.213333rem;
      }
      .b-text {
        display: flex;
        div {
          flex: 2;
        }
        .sate {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
}
.confirm-text {
  font-size: 0.4rem;
}
</style>
