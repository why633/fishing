<template>
  <div class="activeList">
    <top-title :isBackPre="false" @backClick="closeWebview">赛事/活动</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="content" id="dataList">
        <div
          class="item"
          v-for="(item, index) in activeList"
          :key="index"
          @click="goDetails(item.id,item.type)"
        >
          <div class="draw-btn" v-if="type==2">抽号</div>
          <div class="img-wrap">
            <img :src="item.coverImage" />
            <div :class="[item.type==1?'active':'game','type']">{{item.type==1?'活动':'赛事'}}</div>
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
  </div>
</template>

<script>
import { appSource } from '@/utils/appSource'
import { getEvent, getDrawGame } from '@/api'
import { formateDate } from '@/utils/formateDate'
export default {
  data () {
    return {
      type: '2', // 1更多 2抽号
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
        noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
    // this.setToken('q7K3kYrYhOLNxD5IRtutvQ')
    this.type = this.$route.query.type
    this.$getAppToken()
    // if (appSource() === 'ios') {
    //   window['getToken'] = (result) => {
    //     alert(`${new Date()}:${result}`)
    //     this.setToken(result)
    //   }
    // }
    // if (appSource() === 'andriod') {
    //   alert(window.android.getToken())
    //   // 传id和 type给app
    //   // window.android.look('21', 2)
    //   this.setToken(window.android.getToken())
    // }
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
        if (this.type === '2') {
          getDrawGame(params).then(res => {
            console.log(res)
            const resData = res.data.data
            this.activeList = pageNo === 1 ? resData : this.activeList.concat(resData)
            resolve(resData.length)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        } else {
          getEvent(params).then(res => {
            console.log(res)
            const resData = res.data.data
            this.activeList = pageNo === 1 ? resData.list : this.activeList.concat(resData.list)
            resolve(resData.list.length)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
        }
      })
    },
    goDetails (id, eventType) {
      if (this.type === '1') { // 进入详情
        this.goAppDetails()
      }
      if (this.type === '2') { // 进入抽号
        this.$router.push(`/business/draw?id=${id}`)
      }
    },
    goAppDetails (id, eventType) {
      if (appSource() === 'ios') {
        App.look(id, eventType) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        // 传id和 type给app
        window.android.look(id, eventType)
      }
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
      height: 3rem;
      // background: pink;
      border-radius: 0.106667rem;
      overflow: hidden;
      img {
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
