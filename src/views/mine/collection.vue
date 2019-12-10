<template>
  <div class="collection">
    <top-title :isBackPre="false" @backClick="colseWebview">我的收藏</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="tab">
        <div class="tab-item" v-for="item in tapData" :key="item.id">
          <span :class="{'active': item.active}" @click="tabHandleClick(item.id)">{{ item.name }}</span>
        </div>
      </div>
      <div class="content" id="dataList">
        <div class="item" v-for="(item, index) in dataList" :key="index">
          <div class="pic-wrap">
            <img :src="item.coverImage" />
          </div>
          <div class="info">
            <div class="title-wrap">
              <span class="title text-overflow">{{ item.name }}</span>
              <div class="tag-wrap">
                <span class="tag bg1">已认证</span>
                <span class="tag bg2">自然水域</span>
                <span class="tag bg3">赛事</span>
                <span class="tag bg4">活动</span>
              </div>
            </div>
            <star-rating :rating="item.star"></star-rating>
            <div class="address">{{ item.address }}</div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { eventCollect } from '@/api'
export default {
  data () {
    return {
      // tab按钮数据
      tapData: [
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
      dataList: [
        {
          name: '梭草鱼垂钓园梭草鱼垂钓园',
          address: '北京市怀柔区杨宋镇梭草村梭草鱼世界',
          star: 4.5,
          posters: 'http://apps.rhino-rack.com.cn/1560077544303.jpg',
          tempFlag: 1
        },
        {
          name: '梭草鱼垂钓园',
          address: '北京市怀柔区杨宋镇梭草村梭草鱼世界',
          star: 3.5,
          posters: 'http://apps.rhino-rack.com.cn/1560077544303.jpg',
          tempFlag: 1
        },
        {
          name: '梭草鱼垂钓园',
          address: '北京市怀柔区杨宋镇梭草村梭草鱼世界',
          star: 2,
          posters: 'http://apps.rhino-rack.com.cn/1560077544303.jpg',
          tempFlag: 1
        }
      ],
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
      this.tapData.map((item, index) => {
        this.order = id
        if (id === item.id) {
          item.active = true
        } else {
          item.active = false
        }
      })
      // this.pageNo = 1
      // this.articleListData = []
      // this.mescroll.resetUpScroll()
    },
    // 获取收藏的赛事活动列表
    getEventCollect (pageNo) {
      return new Promise((resolve, reject) => {
        eventCollect({ pageNo: pageNo }).then(res => {
          console.log(res)
          const resData = res.data.data
          this.dataList = pageNo === 1 ? resData.list : this.dataList.concat(resData.list)
          resolve(resData.list.length)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
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
        _this.getEventCollect(page.num).then(res => {
          _this.$nextTick(() => {
            mescroll.endSuccess(res)
          })
        })
      }, 200).catch(err => {
        console.log(err)
        mescroll.endErr()
      })
    },
    colseWebview () {
      this.$closeWebview()
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
  padding-left: 0.42667rem;
  .item {
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
          justify-content: space-between;
          .tag {
            padding: 0 0.08rem;
            // flex: 1;
            display: inline-block;
            font-size: 0.26667rem;
            color: #fff;
            height: 0.48rem;
            line-height: 0.48rem;
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
