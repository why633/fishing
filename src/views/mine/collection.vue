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
        .title {
          font-size: 0.42667rem;
          font-weight: 500;
        }
      }
      .address{
        margin-top: .69333rem;
        color: #969799;
        font-size: .32rem;
      }
    }
  }
}
</style>
