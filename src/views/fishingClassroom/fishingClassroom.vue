<template>
  <div class="fishingClassroom">
    <top-title :isBackPre="false" @backClick="colseWebview">钓技课堂</top-title>
    <div class="public-class">
      <div class="title font-b">大众课程</div>
      <div class="class-wrap">
        <div
          class="item"
          v-for="item in classBlockData"
          :key="item.id"
          @click="goClassDetails(item.id)"
        >
          <img :src="item.imgUrl">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="article-wrap">
      <div class="tab">
        <div class="tab-item" v-for="item in articleTapData" :key="item.id">
          <span :class="{'active': item.active}" @click="tabHandleClick(item.id)">{{ item.name }}</span>
        </div>
      </div>
      <article-list :articleListData="articleListData"></article-list>
    </div>
  </div>
</template>

<script>
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
  created () {
    console.log('fresh')
  },
  methods: {
    // 最新最热tab切换
    tabHandleClick (id) {
      console.log(id)
      this.articleTapData.map((item, index) => {
        console.log(index)
        if (id === item.id) {
          item.active = true
        } else {
          item.active = false
        }
      })
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
    }
  }
}
</script>

<style lang="scss" scoped>
.fishingClassroom{
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
