<template>
  <div class="message">
    <top-title :isBackPre="false" @backClick="colseWebview">消息</top-title>
    <div class="content">
      <div class="class-item clear-fix" v-for="(item, index) in classData" :key="index">
        <span class="icon">
          <img :src="item.icon">
        </span>
        <span class="title">{{ item.title }}</span>
        <span class="iconfont icon-arrow right arrow" @click="toDetail(item.type)"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      classData: [
        {
          type: 'active',
          icon: require('@/assets/message_event.png'),
          title: '赛事/活动'
        },
        {
          type: 'follow',
          icon: require('@/assets/message_user.png'),
          title: '关注'
        }
      ]
    }
  },
  methods: {
    colseWebview () {
      console.log('closeWebview')
    },
    toDetail (type) {
      console.log(type)
      this.$router.push(`/message/messageList?type=${type}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.message {
  min-height: 100%;
  background: #fff;
}
.content {
  padding: 0 0 0.42667rem 0.42667rem;
  .class-item {
    position: relative;
    padding: 0.26667rem 0.42667rem 0.26667rem 0;
    border-bottom: 1px solid #f4f4f4;
    .icon {
      display: inline-block;
      width: 1.06667rem;
      height: 1.06667rem;
      margin-right: 0.13333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .arrow {
      position: absolute;
      top: 50%;
      right: 0.42667rem;
      transform: translateY(-50%);
      padding: 0.4rem;
    }
  }
}
</style>
