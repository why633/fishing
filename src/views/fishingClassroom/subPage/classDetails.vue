<template>
  <div class="classDetails">
    <top-title>{{spotType | classTitle}}</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <article-list :articleListData="articleListData" id="dataList"></article-list>
    </mescroll-vue>
  </div>
</template>

<script>
import { articleList } from '@/api'
export default {
  name: 'classDetails',
  data () {
    return {
      spotType: '',
      // 文章数据列表
      articleListData: [
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
        noMoreSize: 10, // 如果列表已无数据,可设置列表的总数量要大于等于10条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
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
    console.log(this.$route.query)
    this.spotType = this.$route.query.id
    console.log(this.spotType)
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
    // 跳转文章详情
    goArticle (id) {
      this.$router.push(`/fishingClassroom/articleDetails?articleId=${id}`)
    },
    // 获取文章列表
    getArticleList (pageNo) {
      return new Promise((resolve, reject) => {
        const params = {
          spotType: this.spotType,
          order: 'hot',
          pageNo: pageNo
        }
        articleList(params).then(res => {
          const resData = res.data.data
          this.articleListData = pageNo === 1 ? resData.list : this.articleListData.concat(resData.list)
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
.classDetails {
  min-height: 100vh;
  background: #fff;
}
</style>
