<template>
  <div class="eventMessage">
    <top-title>赛事/活动通知</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="content" id="dataList">
        <div class="item" v-for="(item, index) in listData" :key="index">
          <div class="avatar-wrap">
            <img :src="item.avatar">
          </div>
          <div class="info">
            <div class="sender">{{ item.fromId }}</div>
            <div class="date-time">{{ item.createTime | formateDateTime }}</div>
            <div class="message">
              <div>{{ item.message }}</div>
              <span>查看赛事详情</span>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { getMessage } from '@/api/index'
export default {
  name: '',
  data () {
    return {
      listData: [
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
  created () {
    this.getMessageList()
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
        _this.getMessageList(page.num).then(res => {
          _this.$nextTick(() => {
            mescroll.endSuccess(res)
          })
        }).catch(err => {
          console.log(err)
          mescroll.endErr()
        })
      }, 200)
    },
    // 获取消息列表
    getMessageList (pageNo) {
      return new Promise((resolve, reject) => {
        getMessage({ type: 1, pageNo: pageNo }).then(res => {
          const resData = res.data
          this.listData = pageNo === 1 ? resData.data.list : this.listData.concat(resData.data.list)
          resolve(resData.data.list.length)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.eventMessage {
  min-height: 100%;
  background: #fff;
}
.content {
  .item {
    padding: 0.426667rem;
    display: flex;
    .avatar-wrap {
      width: 1.066667rem;
      height: 1.066667rem;
      background: url("./images/sender1.png");
      background-size: 100% 100%;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.213333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding-top: 0.106667rem;
      flex: 1;
      .sender {
        font-size: 0.346667rem;
      }
      .date-time {
        font-size: 0.32rem;
        color: #b8b8b8;
        margin-top: 0.213333rem;
      }
      .message {
        padding: 0.32rem;
        background: #f7f7f7;
        margin-top: 0.293333rem;
        border-radius: 0.106667rem;
        line-height: 1.4em;
        span {
          font-size: 0.373333rem;
          color: #0075f6;
        }
      }
    }
  }
}
</style>
