<template>
  <div class="scoreRule">
    <div class="content">
      <div class="top">
        <div class="user-info">
          <div class="tip">升级获得尊贵特权</div>
          <div class="name">
            魏彬
          </div>
          <div class="score">
            现有积分：1000分
          </div>
        </div>
        <div class="card">
          <div class="date">会员有效期：2022-02-02</div>
          <div class="range">普通会员</div>
        </div>
      </div>
      <div class="width">
        <div class="range">
          <div class="title-wrap"><span class="title">会员等级</span><span class="icon"></span></div>
          <highcharts ref="chart" :options="chartOptions"></highcharts>
          <div class="logo"><img :src="logo" alt="" srcset=""></div>
          <div class="legend">
            <div class="item">
              <span class="color bc1"></span>
              赛事报名消费
              <span class="per c1">17%</span>
              335元/2000元
            </div>
            <div class="item">
              <span class="color bc2"></span>
              赛事报名次数
              <span class="per c2">17%</span>
              335次/2000次
            </div>
            <div class="item">
              <span class="color bc3"></span>
              活动报名费用
              <span class="per c3">17%</span>
              335元/2000元
            </div>
          </div>
        </div>
        <div class="gap">
          还有<span class="c1 f20">1650</span>元赛事消费&nbsp;&nbsp;/&nbsp;&nbsp;<span class="c2 f20">10</span>次赛事报名&nbsp;&nbsp;/&nbsp;&nbsp;<span class="c3 f20">16500</span>元活动消费
          <div>
            您即可升级<span class="f20">银卡会员</span>
          </div>
        </div>
      </div>
      <div class="icon-wrap">
        <div class="row">
          <div class="item">
            <img :src="icon1" alt="" srcset="">
            <p class="text">积分商城</p>
          </div>
          <div class="item">
            <img :src="icon2" alt="" srcset="">
            <p class="text">积分账单</p>
          </div>
          <div class="item">
            <img :src="icon3" alt="" srcset="">
            <p class="text">积分赛事</p>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <img :src="icon4" alt="" srcset="">
            <p class="text">会员手册</p>
          </div>
          <div class="item">
            <img :src="icon5" alt="" srcset="">
            <p class="text">积分抽奖</p>
          </div>
          <div class="item">
            <img :src="icon6" alt="" srcset="">
            <p class="text">钓技课堂</p>
          </div>
        </div>
      </div>
      <div class="width">
        <div class="title-wrap"><span :class="[tarTab==2?'no-sel':'','title']" @click="tabToggle(1)">热门兑换</span><span class="title">&nbsp;|&nbsp;</span><span :class="[tarTab==1?'no-sel':'','title']" @click="tabToggle(2)">获取积分</span><span class="more">更多>>></span></div>
        <div class="good-list" v-show="tarTab == 1">
          <div class="item">
            <div class="img-box"></div>
            <div class="price c1"><span class="f20">99</span>积分</div>
            <div class="name">钓鱼线钓鱼线钓鱼线钓鱼线</div>
          </div>
          <div class="item">
            <div class="img-box"></div>
            <div class="price c1"><span class="f20">99</span>积分</div>
            <div class="name">钓鱼线钓鱼线钓鱼线钓鱼线</div>
          </div>
          <div class="item">
            <div class="img-box"></div>
            <div class="price c1"><span class="f20">99</span>积分</div>
            <div class="name">钓鱼线钓鱼线钓鱼线钓鱼线</div>
          </div>
        </div>
        <div class="event-list" v-show="tarTab == 2">
          <div class="item">
            <div class="img-box"></div>
            <div class="info">
              <div class="name">偷钓 日常 xxx钓场</div>
              <div class="type">类型：活动</div>
              <div class="date-time">时间：2020-01-01</div>
            </div>
          </div>
          <div class="item">
            <div class="img-box"></div>
            <div class="info">
              <div class="name">偷钓 日常 xxx钓场</div>
              <div class="type">类型：活动</div>
              <div class="date-time">时间：2020-01-01</div>
            </div>
          </div>
          <div class="item">
            <div class="img-box"></div>
            <div class="info">
              <div class="name">偷钓 日常 xxx钓场</div>
              <div class="type">类型：活动</div>
              <div class="date-time">时间：2020-01-01</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import SolidGauge from 'highcharts/modules/solid-gauge.js'
export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
      logo: require('./images/logo.png'),
      icon1: require('./images/icon1.png'),
      icon2: require('./images/icon2.png'),
      icon3: require('./images/icon3.png'),
      icon4: require('./images/icon4.png'),
      icon5: require('./images/icon5.png'),
      icon6: require('./images/icon6.png'),
      chartOptions: {
        chart: {
          type: 'solidgauge',
          height: '30%',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0]
        },
        credits: {
          enabled: false
        },
        title: {
          text: ''
        },
        pane: {
          center: ['20%', '60%'],
          size: '100%',
          startAngle: -120,
          endAngle: 120,
          background: [
            {
              backgroundColor: '#EEE',
              borderWidth: 0,
              innerRadius: '86%',
              outerRadius: '100%',
              shape: 'arc'
            },
            {
              backgroundColor: '#EEE',
              borderWidth: 0,
              innerRadius: '59%',
              outerRadius: '74%',
              shape: 'arc'
            },
            {
              backgroundColor: '#EEE',
              borderWidth: 0,
              innerRadius: '34%',
              outerRadius: '49%',
              shape: 'arc'
            }
          ]
        },
        tooltip: {
          enabled: false
        },
        legend: {
          layout: 'vertical',
          verticalAlign: 'middle',
          align: 'right',
          itemStyle: {
            color: '#7c7c7c'
          },
          maxHeight: 200,
          // itemMarginBottom: 10,
          // symbolHeight: 12,
          // symbolWidth: 12,
          // symbolRadius: 0,
          labelFormatter: function () {
            console.log(this)
            return this.name + ' ' + this.yData[0] + '%'
          }
        },
        // the value axis
        yAxis: {
          lineWidth: 0,
          minorTickInterval: null,
          min: 0,
          max: 100,
          tickPixelInterval: 400,
          tickWidth: 0,
          labels: {
            enabled: false
          }
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: -15,
              borderWidth: 0,
              useHTML: true,
              formatter: function () {
                // return '<div style="width:0.6rem;height:0.6rem;"><img style="width:100%;height:100%;" src="./images/logo.png" /></div>'
                return ''
              }
            },
            showInLegend: false // 显示在图例中
          }
        },
        series: [
          {
            name: '赛事报名消费',
            data: [
              {
                radius: '100%',
                innerRadius: '86%',
                color: '#d5ab64',
                y: 80
              }
            ]
          },
          {
            name: '赛事报名次数',
            data: [
              {
                radius: '74%',
                innerRadius: '59%',
                color: '#1c53a3',
                y: 60
              }
            ]
          },
          {
            name: '活动报名费用',
            data: [
              {
                radius: '49%',
                innerRadius: '34%',
                color: '#c65e50',
                y: 20
              }
            ]
          }
        ]
      },
      tarTab: 1
    }
  },
  mounted () {

  },
  created () {
    HighchartsMore(Highcharts)
    SolidGauge(Highcharts)
  },
  methods: {
    tabToggle (tar) {
      this.tarTab = tar
    }
  }
}
</script>

<style lang="scss" scoped>
.scoreRule{
  min-height: 100%;
  background: #ffffff;
}
.content{
  // padding: .533333rem;
}
.width{
  padding: .533333rem;
}
.title-wrap{
  .title{
    font-size: .4rem;
    font-weight: 700;
  }
  .icon{
    width: .4rem;
    height: .4rem;
    background: url('./images/tips.png');
    background-size: 100% 100%;
    float: right;
  }
  .no-sel{
    color: #808185;
  }
  .more{
    float: right;
  }
}
.top{
  height: 3.04rem;
  background: url('./images/top-bg.png');
  background-size: 100% 100%;
  overflow: hidden;
  .user-info{
    float: left;
    margin-left: 1.066667rem;
    color: #fff;
    margin-top: .466667rem;
    .tip{
      font-size: .293333rem;
    }
    .name{
      margin-top: .533333rem;
      margin-bottom: .373333rem;
      font-size: .666667rem;
      font-weight: 600;
    }
    .score{
    }
  }
  .card{
    float: right;
    width: 4rem;
    height: 2.6rem;
    // background: url('./images/card-bg.png');
    background-size: 100% 100%;
    margin-right: 1rem;
    margin-top: 0.8rem;
    color: #fff;
    .date{
      font-size: .266667rem;
      float: right;
      margin-top: .5rem;
    }
    .range{
      margin-top: .4rem;
      float: right;
      font-size: .4rem;
    }
  }
}
.bc1{
  background: #d5ab64;
}
.bc2{
  background: #1c53a3;
}
.bc3{
  background: #c65e50;
}
.c1{
  color: #d5ab64;
}
.c2{
  color: #1c53a3;
}
.c3{
  color: #c65e50;
}
.f20{
  font-family: '微软雅黑';
  font-size: .533333rem;
}
.range{
  position: relative;
  .logo{
    position: absolute;
    width: .5rem;
    height: .5rem;
    top: 64%;
    left: 20%;
    transform: translate(-50%, -50%);
    img{
      width: 100%;
      height: 100%;
    }
  }
  .legend{
    position: absolute;
    top: 53%;
    transform: translateY(-50%);
    right: 0;
    font-size: .293333rem;
    color: #808185;
    .item{
      height: .666667rem;
      line-height: .666667rem;
      font-family: '微软雅黑';
      .color{
        display: inline-block;
        width: .213333rem;
        height: .213333rem;
        border-radius: 50%;
        position: relative;
        top: 14%;
        transform: translateY(-50%);
      }
      .per{
        font-size: .48rem;
      }
    }
  }
}
.gap{
  font-size: .293333rem;
  color: #808185;
  line-height: 2;
}
.icon-wrap{
  padding: 0 .666667rem;
  .row{
    display: flex;
    justify-content: space-between;
    .item{
      // width: 1.6rem;
      // height: 1.6rem;
      // background: pink;
      margin-bottom: .666667rem;
      img{
        display: block;
        width: 1.173333rem;
        height: 1.173333rem;
        margin: 0 auto;
      }
      .text{
        font-size: .32rem;
        font-weight: 600;
        margin-top: .4rem;
      }
    }
  }
}
.good-list{
  .item{
    display: flex;
    padding: .4rem 0;
    border-bottom: 1px solid #eee;
    justify-content: space-between;
    align-items: center;
    &:last-child{
      border-bottom: none;
    }
    .img-box{
      // flex: 1;
      width: 2.666667rem;
      height: 2.666667rem;
      background: pink;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .price{
      flex: 1;
      text-align: center;
    }
    .name{
      flex: 1;
      line-height: 1.2;
    }
  }
}
.event-list{
  .item{
    display: flex;
    padding: .4rem 0;
    border-bottom: 1px solid #eee;
    align-items: center;
    &:last-child{
      border-bottom: none;
    }
    .img-box{
      // flex: 1;
      width: 2.666667rem;
      height: 2.666667rem;
      background: pink;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .info{
      flex: 1;
      margin-left: .266667rem;
      .name{

      }
      .type{
        margin: .4rem 0;
      }
      .date-time{

      }
    }
  }
}
</style>
