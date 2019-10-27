<template>
  <div class="userInfo">
    <div class="top-ban title-color">
      <div class="avatar">
        <img src alt srcset />
      </div>
      <div class="user-name text-center">木子</div>
      <div class="sign text-center">
        <span>个性签名：</span>
        <span>开心每一天</span>
      </div>
    </div>
    <div class="tab-block">
        <div class="tab-item">
            <div class="num">2</div>
            <div>关注</div>
        </div>
        <div class="tab-item">
            <div class="num">2</div>
            <div>粉丝</div>
        </div>
        <div class="tab-item">
            <div class="btn" >关注</div>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.top-ban {
  height: 3.466667rem;
  overflow: hidden;
  color: #fff;
  .avatar {
    width: 1.493333rem;
    height: 1.493333rem;
    border-radius: 50%;
    overflow: hidden;
    background: pink;
    margin: 0.666667rem auto 0;
  }
  .user-name{
    font-size: .373333rem;
    margin: .2rem 0 .133333rem;
  }
  .sign {
    font-size: 0.293333rem;
  }
}
.tab-block{
    display: flex;
    background: #fff;
    font-size: .346667rem;
    padding: 0 .4rem;
    .tab-item{
        flex: 1;
        text-align: center;
        padding: .5rem 0;
        position: relative;
        .num{
            margin: .08rem;
        }
        .btn{
            width: 2.666667rem;
            padding: .133333rem 0;
            background: #ff9305;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
        }
    }
}
</style>
