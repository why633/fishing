<template>
  <div class="userInfo">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="top-ban title-color">
        <div class="avatar">
          <img src alt srcset>
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
          <div class="btn">关注</div>
        </div>
      </div>

      <!--内容...-->
      <div id="dataList" class="list-wrap">
        <div class="list-item" v-for="item in listData" :key="item.id">
          <div class="text-wrap">
            <div class="title">{{ item.title }}</div>
            <div class="data-time">{{ item.dateTime }}</div>
          </div>
          <div class="pic-wrap">
            <img src>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
export default {
  data () {
    return {
      listData: [
        {
          title: '我的收获1',
          dateTime: '19/10月24日 08:12'
        },
        {
          title: '我的收获2',
          dateTime: '19/10月24日 08:12'
        },
        {
          title: '我的收获2',
          dateTime: '19/10月24日 08:12'
        },
        {
          title: '我的收获2',
          dateTime: '19/10月24日 08:12'
        },
        {
          title: '我的收获2',
          dateTime: '19/10月24日 08:12'
        }
      ],
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: false,
        isLock: true,
        mustToTop: true
      },
      mescrollUp: {
        auto: false,
        offset: 10,
        isBounce: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        noMoreSize: 10, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // toTop: {
        //   // src: './static/mescroll/mescroll-totop.png' // 回到顶部按钮的图片路径,支持网络图
        // },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          // icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
          tip: '暂无相关数据~', // 提示
          btntext: '去逛逛 >' // 按钮,默认""
          // btnClick () { // 点击按钮的回调,默认null
          //   alert('点击了按钮,具体逻辑自行实现')
          // }
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false
        }
      }
    }
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      console.log('up')
      // 数据渲染成功后,隐藏下拉刷新的状态
      setTimeout(function () {
        // this.$nextTick(() => {
        mescroll.endSuccess(100)
        // })
      }, 3000)
    }
  }
}
</script>

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
  .user-name {
    font-size: 0.373333rem;
    margin: 0.2rem 0 0.133333rem;
  }
  .sign {
    font-size: 0.293333rem;
  }
}
.tab-block {
  display: flex;
  background: #fff;
  font-size: 0.346667rem;
  padding: 0 0.4rem;
  .tab-item {
    flex: 1;
    text-align: center;
    padding: 0.5rem 0;
    position: relative;
    .num {
      margin: 0.08rem;
    }
    .btn {
      width: 2.666667rem;
      padding: 0.133333rem 0;
      background: #ff9305;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
    }
  }
}
.list-wrap {
  margin-top: 0.26667rem;
  .list-item {
    position: relative;
    background: #fff;
    padding: 0.26667rem 0.4rem;
    display: flex;
    align-items: center;
    overflow: hidden;
    &::after {
      display: block;
      position: absolute;
      content: "";
      width: 100%;
      height: 1px;
      background: #f4f4f4;
      bottom: 0;
    }
    .text-wrap {
      padding-right: 0.26667rem;
      flex: 1;
      .title {
        font-size: 0.37333rem;
        font-weight: 700;
        margin-bottom: 0.26667rem;
      }
    }
    .pic-wrap {
      width: 2.66667rem;
      height: 2.66667rem;
      background: blue;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.mescroll {
  position: fixed;
  padding-bottom: 1rem;
  top: 2px;
  bottom: 0;
  height: auto;
}
</style>
