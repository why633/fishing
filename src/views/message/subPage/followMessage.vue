<template>
  <div class="followMessage">
    <top-title>关注通知</top-title>
    <div class="content">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="avator">
          <img :src="item.avator">
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="text">
            关注了您
            <span>去主页看看</span>
          </div>
        </div>
        <div class="date-time">{{ item.dataTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessage } from '@/api/index'
export default {
  data () {
    return {
      listData: [
        {
          name: '用户-why',
          avator: require('@/assets/avator2.jpeg'),
          dataTime: '10月26日 14:30'
        },
        {
          name: '天下第一',
          avator: require('@/assets/avator1.jpeg'),
          dataTime: '10月31日 14:56'
        }
      ]
    }
  },
  created () {
    this.getMessageList()
  },
  methods: {
    // 获取消息列表
    getMessageList () {
      getMessage({type: 1}).then(res => {
        const resData = res.data
        console.log(resData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.followMessage {
  min-height: 100%;
  background: #fff;
}
.content {
  padding: 0 0.42667rem 0.42667rem;
  .item {
    padding: 0.42667rem 0;
    display: flex;
    border-bottom: 1px solid #f4f4f4;
    .avator {
      width: 1.06667rem;
      height: 1.06667rem;
      border-radius: 50%;
      overflow: hidden;
      // background: pink;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding: 0.08rem 0.21333rem;
      flex: 1;
      .text {
        font-size: .32rem;
        color: #787878;
        margin-top: 0.18667rem;
        span{
          color: #0075F6;
        }
      }
    }
    .date-time {
      padding-top: 0.08rem;
      font-size: 0.32rem;
      color: #787878;
    }
  }
}
</style>
