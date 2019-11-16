<template>
  <div class="eventMessage">
    <top-title>赛事/活动通知</top-title>
    <div class="content">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="avatar-wrap">
          <img :src="item.avatar" />
        </div>
        <div class="info">
          <div class="sender">{{ item.sender }}</div>
          <div class="date-time">{{ item.dateTime }}</div>
          <div class="message">
            <div>{{ item.message }}</div>
            <span>查看赛事详情</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      listData: [
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        },
        {
          avatar: require('@/assets/sender1.png'),
          sender: '系统管理员',
          dateTime: '2019-10-11 20:30',
          message: '您报名的赛事“卡亚克舟钓世界锦标赛”，已经开始钓位摇号。'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.eventMessage {
  min-height: 100%;
  background: #fff;
}
.content {
  .item {
    padding: 0.426667rem;
    display: flex;
    .avatar-wrap {
      width: 1.066667rem;
      height: 1.066667rem;
      background: pink;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.213333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding-top: .106667rem;
      flex: 1;
      .sender {
        font-size: 0.346667rem;
      }
      .date-time {
        font-size: 0.32rem;
        color: #b8b8b8;
        margin-top: 0.213333rem;
      }
      .message {
        padding: 0.32rem;
        background: #f7f7f7;
        margin-top: 0.293333rem;
        border-radius: 0.106667rem;
        line-height: 1.4em;
        span{
          font-size: .373333rem;
          color: #0075F6;
        }
      }
    }
  }
}
</style>
