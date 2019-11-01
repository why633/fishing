<template>
  <div class="article-list">
    <div class="item" v-for="item in articleListData" :key="item.id" @click="goArticle(item.id)">
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
</template>

<script>
export default {
  props: {
    // 文章列表数据
    articleListData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    // 跳转文章详情
    goArticle (id) {
      this.$router.push(`/fishingClassroom/articleDetails?articleId=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
