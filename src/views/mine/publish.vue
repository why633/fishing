<template>
  <div class="publish">
    <top-title>我的发布</top-title>
    <div class="content">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="text-info">
          <div class="title text-overflowTow">{{ item.title }}</div>
          <div class="date">{{ item.date }}</div>
        </div>
        <div class="pic-wrap">
          <img :src="item.imgUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: [
        {
          id: 1,
          title: '为什么现在有些人不上班，天天去钓鱼？为什么现在有些人不上班，天天去钓鱼？为什么现在有些人不上班，天天去钓鱼？为什么现在有些人不上班，天天去钓鱼？',
          date: '2019年5月7日',
          imgUrl: require('@/assets/fishingClassroom.jpg')
        },
        {
          id: 2,
          title: '为什么现在有些人不上班，天天去钓鱼？',
          date: '2019年5月7日',
          imgUrl: require('@/assets/fishingClassroom2.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.publish {
  min-height: 100%;
  background: #fff;
}
.content {
  padding-left: 0.426667rem;
  .item {
    padding: 0.533333rem 0.426667rem 0.533333rem 0;
    display: flex;
    border-bottom: 1px solid #ebebeb;
    .text-info {
      flex: 1;
      margin-right: 0.266667rem;
      position: relative;
      .title {
        font-size: 0.4rem;
        line-height: 1.2em;
      }
      .date {
        font-size: 0.32rem;
        color: #b8b8b8;
        position: absolute;
        bottom: 0;
      }
    }
    .pic-wrap {
      width: 2.933333rem;
      height: 1.946667rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
