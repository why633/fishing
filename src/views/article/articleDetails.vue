<template>
  <div class="articleDetails">
    <top-title :isBackPre="false" @backClick="colseWebview">文章详情</top-title>
    <article-content :articleInfo="articleInfo"></article-content>
  </div>
</template>
<script>
import { articleDetail } from '@/api/index'
import { appSource } from '@/utils/appSource'
export default {
  name: 'articleDetails',
  data () {
    return {
      infoId: '',
      articleInfo: {}
    }
  },
  mounted () {
    // console.log(this.$route.query)
  },
  created () {
    this.infoId = this.$route.query.articleId
    this.getArticleDetail()
  },
  methods: {
    // 获取文章详情
    getArticleDetail () {
      const params = {
        infoId: this.infoId
      }
      articleDetail(params).then(res => {
        console.log(res)
        const resData = res.data.data
        this.articleInfo = resData
      })
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
    }
  }
}
</script>
<style lang="scss" scoped>
.articleDetails {
  min-height: 100%;
  background: #fff;
}
.top-title {
  height: 1.386667rem;
  line-height: 1.386667rem;
  padding-left: 0.56rem;
  color: #fff;
  font-size: 0.42667rem;
}
</style>
