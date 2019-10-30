<template>
  <div class="fishingClassroom">
    <div class="top-title title-color">
      <span class="iconfont icon-back"></span>钓技课堂
    </div>
    <div class="public-class">
      <div class="title font-b">大众课程</div>
      <div class="class-wrap">
        <div class="item" v-for="item in classBlockData" :key="item.id">
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
      <div class="article-list">
        <div class="item" v-for="item in articleListData" :key="item.id">
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
              <div class="pic-item" v-for="picItem in item.picUrl.slice(0,3)" :key="picItem">
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
  data () {
    return {
      // 模块数据
      classBlockData: [
        {
          id: '1',
          name: '黑坑',
          imgUrl: require('@/assets/fishingClassroom.jpg')
        },
        {
          id: '2',
          name: '野钓',
          imgUrl: require('@/assets/fishingClassroom2.jpg')
        },
        {
          id: '3',
          name: '装备',
          imgUrl: require('@/assets/fishingClassroom4.jpg')
        },
        {
          id: '4',
          name: '路亚',
          imgUrl: require('@/assets/fishingClassroom2.jpg')
        },
        {
          id: '5',
          name: '海钓',
          imgUrl: require('@/assets/fishingClassroom3.jpg')
        },
        {
          id: '6',
          name: '杂谈',
          imgUrl: require('@/assets/fishingClassroom.jpg')
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
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-back{
  font-size: .426667rem;
  margin-right: .53333rem;
  color: #fff;
  position: relative;
  // top: -.008rem;
}
.top-title {
  height: 1.386667rem;
  line-height: 1.386667rem;
  padding-left: 0.56rem;
  color: #fff;
  font-size: 0.42667rem;
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
