<template>
  <div class="follow">
    <top-title>我的关注</top-title>
    <div class="follow-list">
      <div class="item" v-for="item in followData" :key="item.id">
        <div class="avatar">
          <img :src="item.avatar">
        </div>
        <div class="name">{{ item.name }}</div>
        <span class="btn">去主页</span>
      </div>
      <div class="item" style="visibility: hidden" v-if="(followData.length%3)==2"></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      avatar: require('@/assets/avator1.jpeg'),
      followData: [
        {
          id: '1',
          avatar: require('@/assets/avator1.jpeg'),
          name: '木子'
        },
        {
          id: '2',
          avatar: require('@/assets/avator2.jpeg'),
          name: '小明'
        },
        {
          id: '3',
          avatar: require('@/assets/avator1.jpeg'),
          name: '小红'
        },
        {
          id: '4',
          avatar: require('@/assets/avator1.jpeg'),
          name: '小红'
        },
        {
          id: '5',
          avatar: require('@/assets/avator1.jpeg'),
          name: '小红'
        }
      ]
    }
  },
  created () {
    console.log((this.followData.length % 3))
  }
}
</script>
<style lang="scss" scoped>
// .title {
//   height: 1.17333rem;
//   line-height: 1.17333rem;
//   color: #fff;
//   padding-left: 0.4rem;
// }
.follow-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.26667rem .42667rem;
  .item {
    background: #fff;
    width: 2.90667rem;
    height: 3.86667rem;
    text-align: center;
    margin-bottom: .21333rem;
    .avatar {
      width: 0.93333rem;
      height: 0.93333rem;
      border-radius: 50%;
      overflow: hidden;
      // background: pink;
      margin: 0.53333rem auto 0.21333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      // margin: .26667rem 0;
    }
    .btn {
      display: inline-block;
      width: 1.6rem;
      height: 0.74667rem;
      line-height: 0.74667rem;
      text-align: center;
      color: #ff9900;
      border: 1px solid #ff9900;
      box-sizing: border-box;
      border-radius: 0.08rem;
      font-size: 0.34667rem;
      margin-top: 0.42667rem;
    }
  }
}
</style>
