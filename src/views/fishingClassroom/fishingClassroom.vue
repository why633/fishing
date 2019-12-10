<template>
  <div class="fishingClassroom">
    <top-title :isBackPre="false" @backClick="colseWebview">钓技课堂</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="public-class">
        <div class="title font-b">大众课程</div>
        <div class="class-wrap">
          <div
            class="item"
            v-for="item in classBlockData"
            :key="item.id"
            @click="goClassDetails(item.id)"
          >
            <img :src="item.imgUrl" />
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="article-wrap" id="dataList">
        <div class="tab">
          <div class="tab-item" v-for="item in articleTapData" :key="item.id">
            <span :class="{'active': item.active}" @click="tabHandleClick(item.id)">{{ item.name }}</span>
          </div>
        </div>
        <article-list :articleListData="articleListData"></article-list>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { articleList } from '@/api/index'
export default {
  name: 'fishingClassroom',
  data () {
    return {
      // 模块数据
      classBlockData: [
        {
          id: '1',
          name: '黑坑',
          imgUrl: require('@/assets/class1.png')
        },
        {
          id: '2',
          name: '野钓',
          imgUrl: require('@/assets/class2.png')
        },
        {
          id: '3',
          name: '装备',
          imgUrl: require('@/assets/class3.png')
        },
        {
          id: '4',
          name: '路亚',
          imgUrl: require('@/assets/class4.png')
        },
        {
          id: '5',
          name: '海钓',
          imgUrl: require('@/assets/class5.png')
        },
        {
          id: '6',
          name: '杂谈',
          imgUrl: require('@/assets/class6.png')
        }
      ],
      // tab按钮数据
      articleTapData: [
        {
          id: '0',
          name: '最热',
          active: true
        },
        {
          id: '1',
          name: '最新',
          active: false
        }
      ],
      // 文章数据列表
      articleListData: [
      ],
      order: 'hot',
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
      },
      pageNo: 1,
      pageSize: 10,
      totalCount: 0
    }
  },
  created () {
    console.log('fresh')
    // this.getArticleList()
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
        _this.getArticleList(page.num).then(res => {
          _this.$nextTick(() => {
            mescroll.endSuccess(res)
          })
        }).catch(err => {
          console.log(err)
          mescroll.endErr()
        })
      }, 200)
    },
    // 最新最热tab切换
    tabHandleClick (id) {
      this.articleTapData.map((item, index) => {
        if (id === '1') {
          this.order = 'time'
        } else {
          this.order = 'hot'
        }
        if (id === item.id) {
          item.active = true
        } else {
          item.active = false
        }
      })
      this.pageNo = 1
      this.articleListData = []
      this.mescroll.resetUpScroll()
    },
    // 跳转大众课程模块
    goClassDetails (id) {
      this.$router.push(`/fishingClassroom/classDetails?id=${id}`)
    },
    // 跳转文章详情
    goArticle (id) {
      this.$router.push(`/fishingClassroom/articleDetails?articleId=${id}`)
    },
    colseWebview () {
      console.log('colseWebview')
      // if (appSource() === 'ios') {
      //   App.popBack('popBack') // eslint-disable-line
      // }
      // if (appSource() === 'andriod') {
      //   console.log('andriod')
      //   window.android.closePage()
      // }
      this.$closeWebview()
    },
    // 获取文章列表
    getArticleList (pageNo) {
      return new Promise((resolve, reject) => {
        const params = {
          order: this.order,
          pageNo: pageNo
        }
        articleList(params).then(res => {
          const resData = res.data.data
          this.articleListData = pageNo === 1 ? resData.list : this.articleListData.concat(resData.list)
          this.totalCount = resData.page.totalCount
          console.log(resData)
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

<style lang="scss" scoped>
.fishingClassroom {
  min-height: 100vh;
  background: #fff;
}
.public-class {
  .title {
    padding: 0.4rem;
    font-size: 0.42667rem;
  }
  .class-wrap {
    padding: 0 0.26667rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      position: relative;
      width: 2.88rem;
      height: 1.49333rem;
      color: #fff;
      margin-bottom: 0.4rem;
      border-radius: 0.13333rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.article-wrap {
  padding-bottom: 0.66667rem;
  .tab {
    display: flex;
    margin: 0 0.4rem;
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
  .article-list {
    padding-left: 0.4rem;
    .item {
      margin-top: 0.48rem;
      border-bottom: 1px solid #ebebeb;
      .title {
        padding-right: 0.4rem;
        font-size: 0.4rem;
        line-height: 1.2em;
        margin-bottom: 0.21333rem;
      }
      .pic-wrap {
        display: flex;
        justify-content: space-between;
        padding-right: 0.4rem;
        .pic-item {
          width: 2.93333rem;
          height: 1.84rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .two-pic {
        justify-content: flex-start;
      }
      .date-time {
        margin: 0.26667rem 0;
        font-size: 0.29333rem;
        color: #7b7b7d;
      }
      .single-pic-wrap {
        display: flex;
        align-items: flex-start;
        padding-right: 0.4rem;
        .single-title {
          flex: 1;
          padding-right: 0.4rem;
          font-size: 0.4rem;
          line-height: 1.2em;
          margin-bottom: 0.21333rem;
          .date-time {
            margin: 0.26667rem 0;
            font-size: 0.29333rem;
            color: #7b7b7d;
          }
        }
        .single-pic-item {
          width: 2.93333rem;
          height: 1.84rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
