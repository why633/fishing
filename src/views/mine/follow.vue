<template>
  <div class="follow">
    <div class="title title-color"><span class="iconfont icon-back"></span>我的关注</div>
    <div class="follow-list">
      <div class="item" v-for="item in followData" :key="item.id">
        <div class="avatar"><img :src="item.avatar"></div>
        <div class="name">{{ item.name }}</div>
        <span class="btn">去主页</span>
      </div>
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
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  height: 0.85333rem;
  line-height: 0.85333rem;
  color: #fff;
  padding-left: 0.4rem;
  .icon-back{
    font-size: .37333rem;
    margin-right: .53333rem;
  }
}
.follow-list {
  display: flex;
  flex-wrap: wrap;
  padding: .26667rem .26667rem;
  .item {
    background: #fff;
    width: 30%;
    text-align: center;
    padding: .4rem 0;
    margin: 0 .13333rem .26667rem;
    .avatar {
      width: 0.93333rem;
      height: 0.93333rem;
      border-radius: 50%;
      overflow: hidden;
      background: pink;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .name{
      margin: .26667rem 0;
    }
    .btn{
      display: inline-block;
      padding: .08rem .13333rem;
      color: #ff9305;
      border: 1px solid #ff9305;
      box-sizing: border-box;
      border-radius: .08rem;
    }
  }
}
</style>
