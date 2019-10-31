<template>
  <div class="classDetails">
    <div class="top-title title-color">
      <span class="iconfont icon-back" @click="goBack"></span>
      {{titleId | classTitle}}
    </div>
    <div class="article-wrap">
      <div class="article-list">
        <div
          class="item"
          v-for="item in articleListData"
          :key="item.id"
          @click="goArticle(item.id)"
        >
          <div class="single-pic-wrap" v-if="item.picUrl.length == 1">
            <div class="single-title text-overflowTow">
              <div>{{ item.title }}</div>
              <div class="date-time">19/10月10日 10:30</div>
            </div>
            <div class="single-pic-item">
              <img :src="item.picUrl[0]">
            </div>
          </div>
          <div v-if="item.picUrl.length > 1">
            <div class="title text-overflowTow">{{ item.title }}</div>
            <div class="pic-wrap">
              <div class="pic-item" v-for="(picItem, index) in item.picUrl.slice(0,3)" :key="index">
                <img :src="picItem">
              </div>
              <div class="pic-item" v-if="item.picUrl.length == 2"></div>
            </div>
            <div class="date-time">19/10月10日 10:30</div>
          </div>
        </div>
      </div>
    </div>
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
    // 返回
    goBack () {
      this.$router.go(-1)
    },
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
.top-title {
  height: 1.386667rem;
  line-height: 1.386667rem;
  padding-left: 0.56rem;
  color: #fff;
  font-size: 0.42667rem;
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
