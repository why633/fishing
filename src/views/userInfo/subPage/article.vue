<template>
  <div class="article">
    <div class="info-wrap">
      <div class="title">昨天野钓的收获</div>
      <div class="user">
        <div class="item">
          <div class="avatar"><img :src="imgUrl"></div>
        </div>
        <div class="item">
          <div class="name">木子</div>
          <div class="date-time">19-10-24 08:13</div>
        </div>
        <div class="item">
          <div class="btn">已关注</div>
        </div>
      </div>
      <div class="sign">开心每一天</div>
    </div>
    <div class="review-wrap">
      <div class="title">---- 用户评论 ----</div>
      <div class="list">
        <div class="item clear-fix">
          <div class="avatar left"><img :src="imgUrl"></div>
          <div class="info left">
            <div class="name">why</div>
            <div class="text">哎呦不错呀</div>
            <div class="date-time">19/10月25日 05:56</div>
          </div>
        </div>
        <div class="item clear-fix">
          <div class="avatar left"><img :src="imgUrl"></div>
          <div class="info left">
            <div class="name">why</div>
            <div class="text">哎呦不错呀</div>
            <div class="date-time">19/10月25日 05:56</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: require('@/assets/avator1.jpeg')
    }
  }
}
</script>

<style lang="scss" scoped>
.article{
  min-height: 100vh;
  background: #fff;
}
.info-wrap{
  padding: .533333rem .4rem 0;
  .title{
    font-size: .373333rem;
    font-weight: 700;
    margin-bottom: .4rem;
  }
  .user{
    display: flex;
    align-items: center;
    font-size: .4rem;
    .item{
      &:first-child{
        width: .933333rem;
        height: .933333rem;
        background: pink;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      &:nth-child(2){
        flex: 1;
        padding-left: .133333rem;
        .date-time{
          margin-top: .08rem;
          font-size: .293333rem;
          color: gray;
        }
      }
      .btn{
        color: gray;
        padding: .133333rem .213333rem;
        border: 1px solid gray;
        font-size: .346667rem;
      }
    }
  }
  .sign{
    margin-top: .4rem;
  }
}
.review-wrap{
  margin-top: .4rem;
  padding: 0 .4rem;
  .title{
    text-align: center;
  }
  .item{
    margin-top: .266667rem;
    margin-bottom: .533333rem;
    .avatar{
      width: .933333rem;
      height: .933333rem;
      border-radius: 50%;
      overflow: hidden;
      background: pink;
      margin-right: .133333rem;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      .name{

      }
      .text{
        margin: .133333rem 0;
      }
      .date-time{
        font-size: .293333rem;
        color: gray;
      }
    }
  }
}
</style>
