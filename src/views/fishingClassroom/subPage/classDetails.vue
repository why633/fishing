<template>
  <div class="classDetails">
    <top-title>{{titleId | classTitle}}</top-title>
    <article-list :articleListData="articleListData"></article-list>
  </div>
</template>

<script>
export default {
  name: 'classDetails',
  data () {
    return {
      titleId: '',
      // 文章数据列表
      articleListData: [
        {
          id: '1',
          title: '钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP',
          picUrl: [require('@/assets/fishingClassroom.jpg'), require('@/assets/fishingClassroom2.jpg'), require('@/assets/fishingClassroom3.jpg')]
        },
        {
          id: '2',
          title: '钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP',
          picUrl: [require('@/assets/fishingClassroom2.jpg'), require('@/assets/fishingClassroom3.jpg')]
        },
        {
          id: '3',
          title: '钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP',
          picUrl: [require('@/assets/fishingClassroom3.jpg')]
        },
        {
          id: '4',
          title: '钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP',
          picUrl: [require('@/assets/fishingClassroom.jpg'), require('@/assets/fishingClassroom.jpg'), require('@/assets/fishingClassroom2.jpg'), require('@/assets/fishingClassroom3.jpg')]
        },
        {
          id: '5',
          title: '钓鱼排行榜正式成为CAA-舟钓委员会赛事官方合作APP',
          picUrl: [require('@/assets/fishingClassroom.jpg'), require('@/assets/fishingClassroom2.jpg'), require('@/assets/fishingClassroom3.jpg')]
        }
      ]
    }
  },
  mounted () {
    console.log(this.$route.query)
    this.titleId = this.$route.query.id
  },
  methods: {
    // 跳转文章详情
    goArticle (id) {
      this.$router.push(`/fishingClassroom/articleDetails?articleId=${id}`)
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
