<template>
  <div class="collection">
    <top-title :isBackPre="false" @backClick="closeWebview">我的收藏</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="tab">
        <div class="tab-item" v-for="item in tabData" :key="item.id">
          <span :class="{'active': item.active}" @click="tabHandleClick(item.id)">{{ item.name }}</span>
        </div>
      </div>
      <div class="content" id="dataList">
        <div v-if="tabFlag==1">
          <div class="event-item" v-for="(item, index) in dataList" :key="index" @click="goAppEventDetails(item.id,item.type)">
            <div class="img-wrap">
              <img :src="item.coverImage">
            </div>
            <div class="info-wrap">
              <div class="name text-overflowTow">{{item.name}}</div>
              <div class="tag-wrap">
                <span class="tag">{{ item.type == '2' ? '赛事' : '活动' }}</span>
                <span
                  class="tag"
                  :class="item.spotType == '1' ? 'type heikeng' : (item.spotType == '2' ? 'type luya': ( item.spotType == '4' ? 'type haidiao' : (item.spotType == '3' ? 'type ziran' : 'type')))"
                >{{item.spotType == '1' ? '黑坑' : (item.spotType == '2' ? '路亚': ( item.spotType == '4' ? '海钓' : (item.spotType == '3' ? '自然水域':'')))}}</span>
                <span
                  class="tag"
                  :class="item.isPast ? 'end' : 'going'"
                >{{ item.isPast ? '已过期' : '报名中' }}</span>
              </div>
              <div class="text">上限：{{ item.peopleNumber }}人</div>
              <div class="text">费用：{{ item.money + '元/人' }}</div>
              <div class="text">时间：{{ item.startTime|formateDateTime }}</div>
            </div>
          </div>
        </div>
        <div v-if="tabFlag==2">
          <div
            class="spot-item"
            v-for="(item, index) in dataList"
            :key="index"
            @click="goAppSpotDetails(item.id)"
          >
            <div class="pic-wrap">
              <img :src="item.icon">
            </div>
            <div class="info">
              <div class="title-wrap">
                <span class="title text-overflow">{{ item.name }}</span>
                <div class="tag-wrap">
                  <span class="tag bg1" v-if="item.attestation==2">已认证</span>
                  <span
                    class="tag bg2"
                  >{{item.spotType == '1' ? '黑坑' : (item.spotType == '2' ? '路亚': ( item.spotType == '4' ? '海钓' : (item.spotType == '3' ? '自然水域':'')))}}</span>
                  <span class="tag bg3" v-if="item.game==2">赛事</span>
                  <span class="tag bg4" v-if="item.activity==2">活动</span>
                </div>
              </div>
              <star-rating :rating="item.star"></star-rating>
              <div class="address">{{ item.address }}</div>
            </div>
          </div>
        </div>
        <div v-if="tabFlag==3">
          <div
            class="spot-item"
            v-for="(item, index) in dataList"
            :key="index"
            @click="goAppGoodDetails(item.id)"
          >
            <div class="pic-wrap">
              <img :src="item.coverImg">
            </div>
            <div class="info">
              <div class="title-wrap">
                <span class="title text-overflow">{{ item.name }}</span>
              </div>
              <div class="address">价格：{{ item.price }}元</div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { eventCollect, spotCollect, goodCollect } from '@/api'
import { appSource } from '@/utils/appSource'
export default {
  data () {
    return {
      tabFlag: '1',
      // tab按钮数据
      tabData: [
        {
          id: '1',
          name: '赛事/活动',
          active: true
        },
        {
          id: '2',
          name: '钓场',
          active: false
        },
        {
          id: '3',
          name: '商品',
          active: false
        }
      ],
      dataList: [],
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: false,
        isLock: true,
        mustToTop: true
      },
      mescrollUp: {
        auto: true,
        offset: 10,
        isBounce: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        htmlNodata: '<p class="upwarp-nodata">-- 无更多数据 --</p>',
        noMoreSize: 10, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // toTop: {
        //   // src: './static/mescroll/mescroll-totop.png' // 回到顶部按钮的图片路径,支持网络图
        // },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          // icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
          tip: '暂无相关数据~', // 提示
          btntext: '' // 按钮,默认""
          // btnClick () { // 点击按钮的回调,默认null
          //   alert('点击了按钮,具体逻辑自行实现')
          // }
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      }
    }
  },
  mounted () {
    this.$getAppToken()
  },
  methods: {
    // tab切换
    tabHandleClick (id) {
      this.tabData.map((item, index) => {
        this.tabFlag = id
        if (id === item.id) {
          item.active = true
        } else {
          item.active = false
        }
      })
      // this.pageNo = 1
      this.dataList = []
      this.mescroll.resetUpScroll()
    },
    // 获取收藏的赛事活动列表
    getCollectList (pageNo) {
      return new Promise((resolve, reject) => {
        if (this.tabFlag === '1') {
          eventCollect({ pageNo: pageNo }).then(res => {
            console.log(res)
            const resData = res.data.data
            this.dataList = pageNo === 1 ? resData.list : this.dataList.concat(resData.list)
            resolve(resData.list.length)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }
        if (this.tabFlag === '2') {
          spotCollect({ pageNo: pageNo }).then(res => {
            console.log(res)
            const resData = res.data.data
            this.dataList = pageNo === 1 ? resData.list : this.dataList.concat(resData.list)
            resolve(resData.list.length)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }
        if (this.tabFlag === '3') {
          goodCollect({ pageNo: pageNo }).then(res => {
            console.log(res)
            const resData = res.data.data
            this.dataList = pageNo === 1 ? resData.list : this.dataList.concat(resData.list)
            resolve(resData.list.length)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }
      })
    },
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
        _this.getCollectList(page.num).then(res => {
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
      this.$closeWebview()
    },
    goAppEventDetails (id, eventType) {
      if (appSource() === 'ios') {
        App.look(id, eventType) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        // 传id和 type给app
        window.android.look(id, eventType)
      }
    },
    goAppSpotDetails (id) {
      if (appSource() === 'ios') {
        App.pushToFishSpot(id) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        // 传id给app
        window.android.jumpToSpotDetail(id)
      }
    },
    goAppGoodDetails (id) {
      if (appSource() === 'ios') {
        App.pushToGoodsDetail(id) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        // 传id给app
        window.android.jumpToGoodsDetail(id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collection {
  min-height: 100%;
  background: #fff;
}
.tab {
  display: flex;
  margin: 0.4rem 0.4rem 0;
  border-bottom: 1px solid #dbdbdb;
  .tab-item {
    font-size: 0.42667rem;
    flex: 1;
    text-align: center;
    span {
      display: inline-block;
    }
    .active {
      color: #367c88;
      border-bottom: 2px solid #367c88;
      padding: 0 0.08rem 0.21333rem;
    }
  }
}
.content {
  // padding-left: 0.42667rem;
  .event-item {
    display: flex;
    padding: 0.4rem 0.26667rem;
    border-bottom: 1px solid rgba(161, 170, 179, 0.2);
    .img-wrap {
      width: 3.44rem;
      height: 3.44rem;
      border-radius: 0.16rem;
      margin-right: 0.26667rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info-wrap {
      flex: 1;
      .name {
        width: 5.6rem;
        font-size: 0.4rem;
        font-weight: 600;
        line-height: 1.2em;
      }
      .tag-wrap {
        margin: 0.26667rem 0;
        width: 4.5rem;
        display: flex;
        justify-content: flex-start;
        .tag {
          padding: 0 0.08rem;
          // flex: 1;
          display: inline-block;
          font-size: 0.26667rem;
          color: #fff;
          height: 0.48rem;
          line-height: 0.48rem;
          margin-right: 0.13333rem;
          background: #f16f41;
          border-radius: 0.05333rem;
        }
        .verify {
          background: #ff9900;
        }
        .type {
          background: #ddd;
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
        .going {
          background: #0ec254;
        }
        .end {
          background: #989aa2;
        }
      }
      .text {
        color: #787878;
        margin-top: 0.16rem;
      }
    }
  }
  .spot-item {
    margin-left: 0.42667rem;
    display: flex;
    padding: 0.42667rem 0.42667rem 0.42667rem 0;
    border-bottom: 1px solid rgba(161, 170, 179, 0.2);
    .pic-wrap {
      width: 2.13333rem;
      height: 2.13333rem;
      margin-right: 0.21333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      .title-wrap {
        margin-bottom: 0.32rem;
        height: 0.53333rem;
        line-height: 0.53333rem;
        display: flex;
        .title {
          width: 2.3rem;
          display: inline-block;
          font-size: 0.42667rem;
          font-weight: 500;
        }
        .tag-wrap {
          width: 4.5rem;
          display: flex;
          justify-content: flex-start;
          .tag {
            padding: 0 0.08rem;
            // flex: 1;
            display: inline-block;
            font-size: 0.26667rem;
            color: #fff;
            height: 0.48rem;
            line-height: 0.48rem;
            margin-right: 0.13333rem;
          }
          .bg1 {
            background: #fda925;
          }
          .bg2 {
            background: #00cd99;
          }
          .bg3 {
            background: #0075f6;
          }
          .bg4 {
            background: #ff6600;
          }
        }
      }
      .address {
        margin-top: 0.61333rem;
        color: #969799;
        font-size: 0.32rem;
      }
    }
  }
}
</style>
