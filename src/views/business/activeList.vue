<template>
  <div class="activeList">
    <top-title :isBackPre="false" @backClick="colseWebview">我的赛事/活动</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="content">
        <div class="item" v-for="(item, index) in activeList" :key="index">
          <div class="img-wrap">
            <img :src="item.coverImage" />
            <div :class="[item.type==1?'active':'game','type']">{{item.type==1?'活动':'赛事'}}</div>
          </div>
          <div class="info">
            <div class="name">{{item.name}}</div>
            <div class="b-text">
              <div class="start-date">开始时间：{{item.startTime|formateDateTime}}</div>
              <div class="sate">钓位：15/1</div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import HandleToken from '@/utils/handleToken'
import { appSource } from '@/utils/appSource'
import { getEvent } from '@/api'
const handleToken = new HandleToken()
export default {
  data () {
    return {
      activeList: [],
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
    if (appSource() === 'ios') {
      window['getToken'] = (result) => {
        alert(`${new Date()}:${result}`)
        this.setToken(result)
      }
    }
    if (appSource() === 'andriod') {
      alert(window.android.getToken())
      // 传id和 type给app
      // window.android.look('21', 2)
      this.setToken(window.android.getToken())
    }
  },
  created () {
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
        })
      }, 200)
    },
    colseWebview () {
      console.log('closeWebview')
      if (appSource() === 'ios') {
        App.popBack('popBack') // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        console.log('andriod')
        window.android.closePage()
      }
    },
    setToken (token) {
      handleToken.setToken(token)
    },
    // 获取赛事活动列表
    getEventList (pageNo) {
      return new Promise((resolve, reject) => {
        const params = {
          areaId: 110100,
          pageNo: pageNo
        }
        getEvent(params).then(res => {
          console.log(res)
          const resData = res.data.data
          this.activeList = pageNo === 1 ? resData.list : this.activeList.concat(resData.list)
          resolve(resData.list.length)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })
    }
  }
}
</script>
<style lang="scss">
.activeList{
  min-height: 100%;
  background: #fff;
}
.content {
  padding: 0.4rem;
  .item {
    margin-bottom: 0.4rem;
    border-radius: 0.106667rem;
    overflow: hidden;
    box-shadow: 0 0.053333rem 0.213333rem 0 rgba(0, 0, 0, 0.12);
    .img-wrap {
      position: relative;
      width: 100%;
      height: 4rem;
      background: pink;
      img{
        width: 100%;
        height: 100%;
      }
      .type {
        position: absolute;
        color: #ffffff;
        font-size: 0.186667rem;
        top: 0.213333rem;
        padding: 0.08rem 0.1rem;
      }
      .active {
        background: #f16f41;
      }
      .game {
        background: #017ed2;
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
</style>
