<template>
  <div class="articleDetails">
    <top-title :isBackPre="false" :shearVisible="shearVisible" :shearOpt="shearOpt" @backClick="closeWebview">文章详情</top-title>
    <mescroll-vue ref="mescroll" :down="{use: false}">
      <article-content :articleInfo="articleInfo"></article-content>
    </mescroll-vue>
  </div>
</template>
<script>
import { articleDetail } from '@/api/index'
export default {
  name: 'articleDetails',
  data () {
    return {
      infoId: '',
      articleInfo: {},
      shearVisible: true,
      shearOpt: {}
    }
  },
  mounted () {
    // console.log(this.$route.query)
  },
  created () {
    this.infoId = this.$route.query.articleId
    if (this.$route.query.isShear === '1') {
      this.shearVisible = false
    }
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
        this.shearOpt = {
          title: resData.title,
          description: '',
          imgUrl: resData.images.split(',')[0]
        }
      })
    },
    closeWebview () {
      this.$closeWebview()
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
