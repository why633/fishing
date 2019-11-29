<template>
  <div class="collection">
    <top-title>我的收藏</top-title>
    <div class="content">
      <div class="item" v-for="(item, index) in dataList" :key="index">
        <div class="pic-wrap">
          <img :src="item.posters">
        </div>
        <div class="info">
          <div class="title-wrap">
            <span class="title">{{ item.name }}</span>
            <span class="tag bg1">已认证</span>
            <span class="tag bg2">自然水域</span>
            <span class="tag bg3">赛事</span>
            <span class="tag bg4">活动</span>
          </div>
          <star-rating :rating="item.star"></star-rating>
          <div class="address">{{ item.address }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        {
          name: '梭草鱼垂钓园',
          address: '北京市怀柔区杨宋镇梭草村梭草鱼世界',
          star: 4.5,
          posters: 'http://apps.rhino-rack.com.cn/1560077544303.jpg',
          tempFlag: 1
        },
        {
          name: '梭草鱼垂钓园',
          address: '北京市怀柔区杨宋镇梭草村梭草鱼世界',
          star: 3.5,
          posters: 'http://apps.rhino-rack.com.cn/1560077544303.jpg',
          tempFlag: 1
        },
        {
          name: '梭草鱼垂钓园',
          address: '北京市怀柔区杨宋镇梭草村梭草鱼世界',
          star: 2,
          posters: 'http://apps.rhino-rack.com.cn/1560077544303.jpg',
          tempFlag: 1
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.collection {
  min-height: 100%;
  background: #fff;
}
.content {
  padding-left: 0.42667rem;
  .item {
    display: flex;
    padding: 0.42667rem 0.42667rem 0.42667rem 0;
    border-bottom: 1px solid rgba(161, 170, 179, 0.2);
    .pic-wrap {
      width: 2.13333rem;
      height: 2.13333rem;
      margin-right: 0.21333rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      .title-wrap {
        margin-bottom: 0.32rem;
        background: pink;
        height: .53333rem;
        line-height: .53333rem;
        .title {
          font-size: 0.42667rem;
          font-weight: 500;
        }
        .tag {
          font-size: 0.26667rem;
          color: #fff;
          padding: 0.08rem 0.10667rem;
        }
        .bg1 {
          background: #fda925;
        }
        .bg2 {
          background: #00cd99;
        }
        .bg3 {
          background: #0075F6;
        }
        .bg4 {
          background: #FF6600;
        }
      }
      .address {
        margin-top: 0.69333rem;
        color: #969799;
        font-size: 0.32rem;
      }
    }
  }
}
</style>
