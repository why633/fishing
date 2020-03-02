<template>
  <div class="colleagueAnalysis">
    <top-title :isBackPre="isBack" :rightVisible="true" @backClick="closeWebview" @pickDistance="pickDistance">同行分析</top-title>
    <div class="content">
      <div class="spot-num chart-wrap">
        <div class="title">钓场数量</div>
        <div class="num">{{spotCount}}</div>
      </div>
      <div class="chart-wrap">
        <div class="title">鱼票价格区间</div>
        <highcharts ref="price" :options="ticketPriceOptions"></highcharts>
      </div>
      <div class="fish-per chart-wrap">
        <div class="title">对象鱼比例</div>
        <highcharts ref="fishPer" :options="fishPerOptions"></highcharts>
      </div>
      <div class="chart-wrap">
        <div class="title">日夜场比例图</div>
        <highcharts ref="dayAndNight" :options="dayAndNightPerOptions"></highcharts>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import HighchartsNoData from 'highcharts/modules/no-data-to-display'
import { spotAnalyse } from '@/api'
export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
      isBack: false,
      kilometer: '5',
      spotCount: 0,
      // 鱼票价格区间图表数据
      ticketPriceOptions: {
        credits: {
          enabled: false
        },
        chart: {
          type: 'bar',
          backgroundColor: '#081630',
          height: 200,
          margin: [0, 0, 0, 80]
          // spacing: [0, 0, 0, 0]
          // spacingButtom: 0
        },
        title: {
          text: ''
        },
        colors: ['#3698F3'],
        xAxis: {
          categories: ['<20 元', '20-30 元', '30-40 元', '40-50 元', '50-60 元', '>60 元'],
          lineWidth: 0,
          title: {
            text: null
          },
          labels: {
            style: {
              color: '#ffffff'
            }
          }
        },
        yAxis: {
          min: 0,
          gridLineColor: '#081630',
          title: {
            text: '',
            align: 'high'
          },
          labels: {
            overflow: 'justify'
          }
        },
        tooltip: {
          valueSuffix: ' %'
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
              color: '#ffffff',
              allowOverlap: true // 允许数据标签重叠
            }
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.1f}%'
            }
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: '',
          data: []
        }],
        noData: {
          position: {
            x: -40
          }
        }
      },
      // 对象鱼比例图表数据
      fishPerOptions: {
        credits: {
          enabled: false
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          backgroundColor: '#081630',
          // backgroundColor: 'black',
          height: 200,
          margin: 0,
          spacing: [0, 0, 0, 0],
          marginLeft: 100
        },
        title: {
          text: ''
        },
        tooltip: {
          enabled: true,
          pointFormatter: function () {
            console.log(this)
            return '占比' + this.y + '%'
          }
        },
        colors: ['#3EBDC6', '#E64E4D', '#F493BC', '#C47674', '#F9C54F', '#64BB5B', '#3091CF', '#A239B3'],
        legend: {
          layout: 'vertical',
          verticalAlign: 'middle',
          align: 'left',
          itemStyle: {
            color: '#ffffff'
          },
          maxHeight: 200,
          itemMarginBottom: 10,
          symbolHeight: 12,
          symbolWidth: 12,
          symbolRadius: 0,
          labelFormatter: function () {
            return this.name + ' ' + this.y + '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true // 显示在图例中
          },
          series: {
            borderWidth: 0
          }
        },
        series: [{
          type: 'pie',
          innerSize: '80%',
          name: '占比',
          data: []
        }],
        noData: {
          position: {
            x: -50
          }
        }
      },
      // 日夜场比例图数据
      dayAndNightPerOptions: {
        credits: {
          enabled: false
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          backgroundColor: '#081630',
          // backgroundColor: 'black',
          height: 280,
          // margin: 0,
          spacing: [0, 0, 0, 0],
          marginButtom: 40
        },
        title: {
          text: ''
        },
        tooltip: {
          enabled: true,
          pointFormatter: function () {
            console.log(this)
            return '占比' + this.y + '%'
          }
        },
        colors: ['#F57D41', '#3DB0EF'],
        legend: {
          layout: 'horizontal',
          // verticalAlign: 'middle',
          // align: 'left',
          itemStyle: {
            color: '#ffffff'
          },
          itemMarginBottom: 10,
          symbolHeight: 12,
          symbolWidth: 12,
          symbolRadius: 0,
          labelFormatter: function () {
            return this.name + ' ' + this.y + '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: false,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true // 显示在图例中
          },
          series: {
            borderWidth: 0
          }
        },
        series: [{
          type: 'pie',
          // innerSize: '80%',
          name: '占比',
          data: []
        }]
      }
    }
  },
  created () {
    this.$getAppToken()
    HighchartsNoData(Highcharts)
    Highcharts.setOptions({
      lang: {
        noData: '暂无数据'
      }
    })
    this.getSpotAnalyse()
  },
  methods: {
    closeWebview () {
      this.$closeWebview()
    },
    // 切换距离结束
    pickDistance (val) {
      console.log(val[0].value)
      this.kilometer = val[0].value
      this.getSpotAnalyse()
    },
    // 获取同行数据
    getSpotAnalyse () {
      const params = {
        kilometer: this.kilometer
      }
      spotAnalyse(params).then(res => {
        console.log(res.data.data)
        const resData = res.data.data
        this.spotCount = resData.spotCount
        const dayTimes = resData.dayTimes.toFixed(1) - 0
        const eveningTimes = resData.eveningTimes.toFixed(1) - 0
        const price1 = resData.price1.toFixed(1) - 0
        const price2 = resData.price2.toFixed(1) - 0
        const price3 = resData.price3.toFixed(1) - 0
        const price4 = resData.price4.toFixed(1) - 0
        const price5 = resData.price5.toFixed(1) - 0
        const price6 = resData.price6.toFixed(1) - 0
        const fish1 = resData.fish1.toFixed(1) - 0
        const fish2 = resData.fish2.toFixed(1) - 0
        const fish3 = resData.fish3.toFixed(1) - 0
        const fishOthers = resData.fishOthers.toFixed(1) - 0
        console.log(dayTimes, eveningTimes)
        console.log(this.$refs['dayAndNight'])
        this.$nextTick(() => {
          console.log(this.$refs['price'].chart.series[0].update)
          this.$refs['price'].chart.series[0].update({
            data: [price1, price2, price3, price4, price5, price6]
          })
          this.$refs['fishPer'].chart.series[0].update({
            data: [
              ['鲤鱼', fish1],
              ['黑鱼', fish2],
              ['鲫鱼', fish3],
              ['其他', fishOthers]
            ]
          })
          this.$refs['dayAndNight'].chart.series[0].update({
            data: [
              ['日场', dayTimes],
              ['夜场', eveningTimes]
            ]
          })
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.colleagueAnalysis{
  min-height: 100%;
  background: #19172F;
}
.content{
  padding: .8rem;
  color: #ffffff;
  .chart-wrap{
    margin: 0 auto 1.333333rem;
    width: 7.466667rem;
    .title{
      text-align: center;
      margin-bottom: .266667rem;
    }
  }
  .spot-num{
    .num{
      width: 4rem;
      height: .933333rem;
      line-height: .933333rem;
      margin: 0 auto;
      background: #0D3059;
      border: .026667rem solid #3C81C0;
      text-align: center;
    }
  }
}
</style>
