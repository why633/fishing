<template>
  <div class="scoreRule">
    <div class="content">
      <div class="top">
        <div class="user-info">
          <div class="tip">升级获得尊贵特权</div>
          <div class="name text-overflow">
            {{cardData.userName}}
          </div>
          <div class="score">
            现有积分：<span>{{cardData.currency}}</span>分
          </div>
        </div>
        <div class="card">
          <div class="date">会员有效期：{{cardData.serviceEndTime | formateDate}}</div>
          <div class="range">{{ cardData.userLevel == 1 ? '普通会员' : (cardData.userLevel == 2 ? '白银会员' : (cardData.userLevel == 3 ? '黄金会员' : (cardData.userLevel == 4?'白金会员':''))) }}</div>
        </div>
      </div>
      <div class="width">
        <div class="title-wrap"><span class="title">会员等级</span><span @click="goH5('/rewardScore/scoreRule?from=score')" class="icon"></span></div>
        <mt-swipe class="swipe-wrap" :auto="0">
          <mt-swipe-item>
            <div class="range">
              <highcharts ref="chart" :options="chartOptions"></highcharts>
              <div class="logo"><img :src="logo" alt="" srcset=""></div>
              <div class="legend">
                <div class="item">
                  <span class="color bc1"></span>
                  赛事报名消费
                  <span class="per c1">{{((cardData.gamePrice/cardData.gameGoalPrice)*100).toFixed(0)=='NaN'?'--':((cardData.gamePrice/cardData.gameGoalPrice)*100).toFixed(0)}}%</span>
                  {{cardData.gamePrice}}元/{{cardData.gameGoalPrice}}元
                </div>
                <div class="item">
                  <span class="color bc2"></span>
                  赛事报名次数
                  <span class="per c2">{{((cardData.gameCount/cardData.gameGoalCount)*100).toFixed(0)=='NaN'?'--':((cardData.gameCount/cardData.gameGoalCount)*100).toFixed(0)}}%</span>
                  {{cardData.gameCount}}次/{{cardData.gameGoalCount}}次
                </div>
                <div class="item">
                  <span class="color bc3"></span>
                  活动报名费用
                  <span class="per c3">{{((cardData.activityPrice/cardData.activityGoalPrice)*100).toFixed(0)=='NaN'?'--':((cardData.activityPrice/cardData.activityGoalPrice)*100).toFixed(0)}}%</span>
                  {{cardData.activityPrice}}元/{{cardData.activityGoalPrice}}元
                </div>
              </div>
            </div>
            <div class="gap" v-if="cardData.userLevel!=4">
              还有<span class="c1 f20">{{cardData.gameGoalPrice?(cardData.gameGoalPrice-cardData.gamePrice):'--'}}</span>元赛事消费&nbsp;&nbsp;/&nbsp;&nbsp;<span class="c2 f20">{{cardData.gameGoalCount?(cardData.gameGoalCount-cardData.gameCount):'--'}}</span>次赛事报名&nbsp;&nbsp;/&nbsp;&nbsp;<span class="c3 f20">{{cardData.activityGoalPrice?(cardData.activityGoalPrice-cardData.activityPrice):'--'}}</span>元活动消费
              <div>
                您即可升级<span class="f20">{{ cardData.userLevel == 1 ? '白银会员' : (cardData.userLevel == 2 ? '黄金会员' : (cardData.userLevel == 3 ? '白金会员' : (cardData.userLevel == 4?'白金会员':''))) }}</span>
              </div>
            </div>
          </mt-swipe-item>
          <mt-swipe-item v-if="!cardData.userLevel&&cardData.userLevel != 1">
            <div class="range">
              <highcharts ref="keepChart" :options="keepChartOptions"></highcharts>
              <div class="logo"><img :src="logo" alt="" srcset=""></div>
              <div class="legend">
                <div class="item">
                  <span class="color bc1"></span>
                  赛事报名消费
                  <span class="per c1">{{((cardData.gamePrice/cardData.gameKeepPrice)*100).toFixed(0)}}%</span>
                  {{cardData.gamePrice}}元/{{cardData.gameKeepPrice}}元
                </div>
                <div class="item">
                  <span class="color bc2"></span>
                  赛事报名次数
                  <span class="per c2">{{((cardData.gameCount/cardData.gameKeepCount)*100).toFixed(0)}}%</span>
                  {{cardData.gameCount}}次/{{cardData.gameKeepCount}}次
                </div>
                <div class="item">
                  <span class="color bc3"></span>
                  活动报名费用
                  <span class="per c3">{{((cardData.activityPrice/cardData.activityKeepPrice)*100).toFixed(0)}}%</span>
                  {{cardData.activityPrice}}元/{{cardData.activityKeepPrice}}元
                </div>
              </div>
            </div>
            <div class="gap" v-if="cardData.userLevel!=4">
              还有<span class="c1 f20">{{cardData.gameKeepPrice-cardData.gamePrice}}</span>元赛事消费&nbsp;&nbsp;/&nbsp;&nbsp;<span class="c2 f20">{{cardData.gameKeepCount-cardData.gameCount}}</span>次赛事报名&nbsp;&nbsp;/&nbsp;&nbsp;<span class="c3 f20">{{cardData.activityKeepPrice-cardData.activityPrice}}</span>元活动消费
              <div>
                您即可<span class="f20">保级</span>
              </div>
            </div>
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="icon-wrap">
        <div class="row">
          <div class="item" @click="goMall">
            <img :src="icon1" alt="" srcset="">
            <p class="text">积分商城</p>
          </div>
          <div class="item" @click="goH5('/rewardScore/scoreLog?from=score')">
            <img :src="icon2" alt="" srcset="">
            <p class="text">积分账单</p>
          </div>
          <div class="item" @click="wait">
            <img :src="icon3" alt="" srcset="">
            <p class="text">积分赛事</p>
          </div>
        </div>
        <div class="row">
          <div class="item" @click="goH5('/rewardScore/scoreRule?from=score')">
            <img :src="icon4" alt="" srcset="">
            <p class="text">会员手册</p>
          </div>
          <div class="item" @click="wait">
            <img :src="icon5" alt="" srcset="">
            <p class="text">积分抽奖</p>
          </div>
          <div class="item" @click="goH5('/fishingClassroom?from=score')">
            <img :src="icon6" alt="" srcset="">
            <p class="text">钓技课堂</p>
          </div>
        </div>
      </div>
      <div class="width">
        <div class="title-wrap"><span :class="[tarTab==2?'no-sel':'','title']" @click="tabToggle(1)">热门兑换</span><span class="title">&nbsp;|&nbsp;</span><span :class="[tarTab==1?'no-sel':'','title']" @click="tabToggle(2)">获取积分</span><span class="more" @click="goMore">更多>>></span></div>
        <div class="good-list" v-show="tarTab == 1">
          <div class="item" v-for="item in hotGood" :key="item.id" @click="goAppGoodDetails(item.id)">
            <div class="img-box">
              <img :src="item.coverImg.split(',')[0]" alt="" srcset="">
            </div>
            <div class="price c1"><span class="f20">{{item.price}}</span>积分</div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>
        <div class="event-list" v-show="tarTab == 2">
          <div class="item" v-for="item in hotSpot" :key="item.id"  @click="goAppEventDetails(item.id, item.type)">
            <div class="img-box">
              <img :src="item.coverImage" alt="" srcset="">
            </div>
            <div class="info">
              <div class="name">{{item.name}}</div>
              <div class="type">类型：{{item.type==1?'活动':'赛事'}}</div>
              <div class="date-time">时间：{{item.startTime | formateDate}}</div>
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
import { getCardLevel, getRecommend } from '@/api'
import { formateDate } from '@/utils/formateDate'
import { appSource } from '@/utils/appSource'
import { Swipe, SwipeItem } from 'mint-ui'
import Vue from 'vue'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
      cardData: {},
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
                y: 0
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
                y: 0
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
                y: 0
              }
            ]
          }
        ]
      },
      keepChartOptions: {
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
                y: 0
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
                y: 0
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
                y: 0
              }
            ]
          }
        ]
      },
      tarTab: 1,
      hotGood: [],
      hotSpot: [],
      baseUrl: 'http://47.92.169.47:9002/fishing' // test
    }
  },
  filters: {
    formateDate: function (value) {
      if (!value) {
        return '--'
      }
      const parmas = {
        dateObj: value,
        fmt: 'yyyy-MM-dd'
      }
      return formateDate(parmas)
    }
  },
  mounted () {
    //
  },
  created () {
    HighchartsMore(Highcharts)
    SolidGauge(Highcharts)
    this.$getAppToken().then(res => {
      this.getCardData()
      this.getRecommendData()
    })
  },
  methods: {
    // 获取积分数据
    getCardData () {
      getCardLevel().then(res => {
        this.cardData = res.data.data
        const p1 = ((this.cardData.gamePrice / this.cardData.gameGoalPrice) * 100).toFixed(0) - 0
        const p2 = ((this.cardData.gameCount / this.cardData.gameGoalCount) * 100).toFixed(0) - 0
        const p3 = ((this.cardData.activityPrice / this.cardData.activityGoalPrice) * 100).toFixed(0) - 0
        this.chartOptions.series[0].data[0].y = p1
        this.chartOptions.series[1].data[0].y = p2
        this.chartOptions.series[2].data[0].y = p3
        const p4 = ((this.cardData.gamePrice / this.cardData.gameKeepPrice) * 100).toFixed(0) - 0
        const p5 = ((this.cardData.gameCount / this.cardData.gameKeepCount) * 100).toFixed(0) - 0
        const p6 = ((this.cardData.activityPrice / this.cardData.activityKeepPrice) * 100).toFixed(0) - 0
        this.$nextTick(() => {
          this.$refs.keepChart.chart.series[0].points[0].update([p4])
          this.$refs.keepChart.chart.series[1].points[0].update([p5])
          this.$refs.keepChart.chart.series[2].points[0].update([p6])
        })
      })
    },
    // 获取推荐数据
    getRecommendData () {
      getRecommend({itemType: this.tarTab}).then(res => {
        console.log(res)
        if (this.tarTab === 1) {
          this.hotGood = res.data.data
        } else {
          this.hotSpot = res.data.data
        }
        console.log(this.hotSpot)
      })
    },
    tabToggle (tar) {
      this.tarTab = tar
      this.getRecommendData()
    },
    wait () {
      this.$toast.show({
        text: '敬请期待'
      })
    },
    goAppEventDetails (id, eventType) {
      if (appSource() === 'ios') {
        App.look(id, eventType) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        // 传id和 type给app
        window.android.lookFromTab(id, eventType)
      }
    },
    goAppEventList (id, eventType) {
      if (appSource() === 'ios') {
        App.pushToEventList() // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        // 传id和 type给app
        window.android.goToEventListFromTab()
      }
    },
    goAppGoodDetails (id) {
      if (appSource() === 'ios') {
        App.pushToGoodsDetail(id) // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        window.android.jumpToGoodsDetailFromTab(id)
      }
    },
    goMall () {
      if (appSource() === 'ios') {
        App.pushToIntegralMall() // eslint-disable-line
      }
      if (appSource() === 'andriod') {
        window.android.gotoPointMarketFromTab()
      }
    },
    goMore () {
      if (this.tarTab === 1) {
        this.goMall()
      } else {
        this.goAppEventList()
      }
    },
    goH5 (route) {
      console.log(this.baseUrl + route)
      this.$appToH5(this.baseUrl + route)
    }
  }
}
</script>

<style lang="scss" scoped>
.scoreRule{
  // min-height: 100%;
  background: #ffffff;
}
.content{
  // padding: .533333rem;
}
.width{
  padding: .533333rem;
}
.swipe-wrap{
  height: 6.133333rem;
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
    margin-left: 0.6rem;
    color: #fff;
    margin-top: .466667rem;
    .tip{
      font-size: .293333rem;
    }
    .name{
      margin-top: .533333rem;
      margin-bottom: .3rem;
      font-size: .666667rem;
      font-weight: 600;
      width: 3.8rem;
    }
    .score{
      width: 3.8rem;
      span{
        display: inline-block;
      }
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
      margin-top: .15rem;
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
      // background: pink;
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
      // background: pink;
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
