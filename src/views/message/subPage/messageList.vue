<template>
  <div class="messageList">
    <top-title>{{ titleText }}</top-title>
    <div class="content"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleText: '关注通知'
    }
  },
  created () {
    if (this.$route.query.type === 'follow') {
      this.titleText = '关注通知'
    } else {
      this.titleText = '赛事/活动通知'
    }
  }
}
</script>
