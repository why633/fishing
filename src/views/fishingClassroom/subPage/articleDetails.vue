<template>
  <div class="articleDetails">
    <top-title :shearVisible="shearVisible" :shearOpt="shearOpt">文章详情</top-title>
    <mescroll-vue ref="mescroll" :down="{use: false}">
      <!-- <div @click="articleShare">分享</div> -->
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
    if (this.$route.query.from === 'shear') {
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
