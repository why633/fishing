<template>
  <div class="spotData">
    <top-title :isBackPre="isBack" @backClick="closeWebview">钓场数据</top-title>
    <div class="date_pick" @click="pickDate"><span class="date_text">时间：{{ dateText }}</span></div>
    <div class="content">
      <div class="item">
        <highcharts ref="spotNum" :options="spotNumOptions"></highcharts>
        <div class="text">签约钓场数量</div>
        <div class="num">{{spotNum}}个</div>
      </div>
      <div class="item">
        <highcharts ref="gameNum" :options="gameNumOptions"></highcharts>
        <div class="text">赛事场次</div>
        <div class="num">{{gameNum}}场</div>
      </div>
      <div class="item">
        <highcharts ref="eventNum" :options="eventNumOptions"></highcharts>
        <div class="text">活动场次</div>
        <div class="num">{{eventNum}}场</div>
      </div>
      <div class="item">
        <highcharts ref="joinNum" :options="joinNumOptions"></highcharts>
        <div class="text">参赛人数</div>
        <div class="num">{{joinNum}}人</div>
      </div>
      <div class="item">
        <highcharts ref="feeNum" :options="feeNumOptions"></highcharts>
        <div class="text">赛事服务费</div>
        <div class="num">{{feeNum}}元</div>
      </div>
    </div>
    <!-- 日期选择组件 -->
    <picker
      :data="pickData"
      :showToolbar="true"
      @cancel="cancel"
      @confirm="confirm"
      :visible.sync="pickerVisible"
    />
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import Highcharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more'
import { getTask } from '@/api'
export default {
  components: {
    highcharts: Chart
  },
  data () {
    return {
      isBack: false,
      pickerValue: '',
      pickerVisible: false,
      dateText: '',
      pickData: [
        [
        ],
        [
          {
            label: '01',
            value: '01'
          },
          {
            label: '02',
            value: '02'
          },
          {
            label: '03',
            value: '03'
          },
          {
            label: '04',
            value: '04'
          },
          {
            label: '05',
            value: '05'
          },
          {
            label: '06',
            value: '06'
          },
          {
            label: '07',
            value: '07'
          },
          {
            label: '08',
            value: '08'
          },
          {
            label: '09',
            value: '09'
          },
          {
            label: '10',
            value: '10'
          },
          {
            label: '11',
            value: '11'
          },
          {
            label: '12',
            value: '12'
          }
        ]
      ],
      result: '',
      // 钓场数量数据
      spotNum: 0,
      spotNumOptions: {
        chart: {
          type: 'gauge',
          backgroundColor: '#151530',
          height: '160',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0]
        },
        tooltip: {
          enabled: false
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        pane: {
          startAngle: -120,
          endAngle: 120,
          background: null,
          size: 150,
          center: ['50%', '66%']
        },
        yAxis: {
          min: 0,
          max: 100,
          tickLength: 14,
          tickColor: '#fff',
          minorTickLength: 10,
          minorTickColor: '#fff',
          tickPixelInterval: 50,
          labels: {
            style: {
              color: '#fff'
            }
          },
          plotBands: [
            {
              from: 0,
              to: 33,
              color: '#f32f47',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 33,
              to: 67,
              color: '#f98b00',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 67,
              to: 100,
              color: '#55feb9',
              outerRadius: '100%',
              thickness: '8'
            }
          ]
        },
        plotOptions: {
          gauge: {
            dial: {
              radius: '50',
              backgroundColor: 'lightblue',
              borderWidth: 0,
              baseWidth: 6,
              topWidth: 0,
              baseLength: '40', // of radius
              rearLength: '0'
            },
            pivot: {
              radius: 4,
              borderWidth: 0,
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            dataLabels: {
              borderWidth: 0,
              verticalAlign: 'center',
              y: 10,
              style: {
                fontWeight: 'normal',
                color: '#fff'
              },
              formatter: function () {
                return `超过${this.y}%专员`
              }
            }
          }
        },
        series: [{
          data: [0]
        }]
      },
      // 赛事场次数据
      gameNum: 0,
      gameNumOptions: {
        chart: {
          type: 'gauge',
          backgroundColor: '#151530',
          height: '160',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0]
        },
        tooltip: {
          enabled: false
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        pane: {
          startAngle: -120,
          endAngle: 120,
          background: null,
          size: 150,
          center: ['50%', '66%']
        },
        yAxis: {
          min: 0,
          max: 100,
          tickLength: 14,
          tickColor: '#fff',
          minorTickLength: 10,
          minorTickColor: '#fff',
          tickPixelInterval: 50,
          labels: {
            style: {
              color: '#fff'
            }
          },
          plotBands: [
            {
              from: 0,
              to: 33,
              color: '#f32f47',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 33,
              to: 67,
              color: '#f98b00',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 67,
              to: 100,
              color: '#55feb9',
              outerRadius: '100%',
              thickness: '8'
            }
          ]
        },
        plotOptions: {
          gauge: {
            dial: {
              radius: '50',
              backgroundColor: 'lightblue',
              borderWidth: 0,
              baseWidth: 6,
              topWidth: 0,
              baseLength: '40', // of radius
              rearLength: '0'
            },
            pivot: {
              radius: 4,
              borderWidth: 0,
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            dataLabels: {
              borderWidth: 0,
              verticalAlign: 'center',
              y: 10,
              style: {
                fontWeight: 'normal',
                color: '#fff'
              },
              formatter: function () {
                return `超过${this.y}%专员`
              }
            }
          }
        },
        series: [{
          data: [0]
        }]
      },
      // 活动场次数据
      eventNum: 0,
      eventNumOptions: {
        chart: {
          type: 'gauge',
          backgroundColor: '#151530',
          height: '160',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0]
        },
        tooltip: {
          enabled: false
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        pane: {
          startAngle: -120,
          endAngle: 120,
          background: null,
          size: 150,
          center: ['50%', '66%']
        },
        yAxis: {
          min: 0,
          max: 100,
          tickLength: 14,
          tickColor: '#fff',
          minorTickLength: 10,
          minorTickColor: '#fff',
          tickPixelInterval: 50,
          labels: {
            style: {
              color: '#fff'
            }
          },
          plotBands: [
            {
              from: 0,
              to: 33,
              color: '#f32f47',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 33,
              to: 67,
              color: '#f98b00',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 67,
              to: 100,
              color: '#55feb9',
              outerRadius: '100%',
              thickness: '8'
            }
          ]
        },
        plotOptions: {
          gauge: {
            dial: {
              radius: '50',
              backgroundColor: 'lightblue',
              borderWidth: 0,
              baseWidth: 6,
              topWidth: 0,
              baseLength: '40', // of radius
              rearLength: '0'
            },
            pivot: {
              radius: 4,
              borderWidth: 0,
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            dataLabels: {
              borderWidth: 0,
              verticalAlign: 'center',
              y: 10,
              style: {
                fontWeight: 'normal',
                color: '#fff'
              },
              formatter: function () {
                return `超过${this.y}%专员`
              }
            }
          }
        },
        series: [{
          data: [0]
        }]
      },
      // 参赛人数数据
      joinNum: 0,
      joinNumOptions: {
        chart: {
          type: 'gauge',
          backgroundColor: '#151530',
          height: '160',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0]
        },
        tooltip: {
          enabled: false
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        pane: {
          startAngle: -120,
          endAngle: 120,
          background: null,
          size: 150,
          center: ['50%', '66%']
        },
        yAxis: {
          min: 0,
          max: 100,
          tickLength: 14,
          tickColor: '#fff',
          minorTickLength: 10,
          minorTickColor: '#fff',
          tickPixelInterval: 50,
          labels: {
            style: {
              color: '#fff'
            }
          },
          plotBands: [
            {
              from: 0,
              to: 33,
              color: '#f32f47',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 33,
              to: 67,
              color: '#f98b00',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 67,
              to: 100,
              color: '#55feb9',
              outerRadius: '100%',
              thickness: '8'
            }
          ]
        },
        plotOptions: {
          gauge: {
            dial: {
              radius: '50',
              backgroundColor: 'lightblue',
              borderWidth: 0,
              baseWidth: 6,
              topWidth: 0,
              baseLength: '40', // of radius
              rearLength: '0'
            },
            pivot: {
              radius: 4,
              borderWidth: 0,
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            dataLabels: {
              borderWidth: 0,
              verticalAlign: 'center',
              y: 10,
              style: {
                fontWeight: 'normal',
                color: '#fff'
              },
              formatter: function () {
                return `超过${this.y}%专员`
              }
            }
          }
        },
        series: [{
          data: [0]
        }]
      },
      // 赛事服务费数据
      feeNum: 0,
      feeNumOptions: {
        chart: {
          type: 'gauge',
          backgroundColor: '#151530',
          height: '160',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0]
        },
        tooltip: {
          enabled: false
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        pane: {
          startAngle: -120,
          endAngle: 120,
          background: null,
          size: 150,
          center: ['50%', '66%']
        },
        yAxis: {
          min: 0,
          max: 100,
          tickLength: 14,
          tickColor: '#fff',
          minorTickLength: 10,
          minorTickColor: '#fff',
          tickPixelInterval: 50,
          labels: {
            style: {
              color: '#fff'
            }
          },
          plotBands: [
            {
              from: 0,
              to: 33,
              color: '#f32f47',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 33,
              to: 67,
              color: '#f98b00',
              outerRadius: '100%',
              thickness: '8'
            },
            {
              from: 67,
              to: 100,
              color: '#55feb9',
              outerRadius: '100%',
              thickness: '8'
            }
          ]
        },
        plotOptions: {
          gauge: {
            dial: {
              radius: '50',
              backgroundColor: 'lightblue',
              borderWidth: 0,
              baseWidth: 6,
              topWidth: 0,
              baseLength: '40', // of radius
              rearLength: '0'
            },
            pivot: {
              radius: 4,
              borderWidth: 0,
              borderColor: 'lightblue',
              backgroundColor: 'lightblue'
            },
            dataLabels: {
              borderWidth: 0,
              verticalAlign: 'center',
              y: 10,
              style: {
                fontWeight: 'normal',
                color: '#fff'
              },
              formatter: function () {
                return `超过${this.y}%专员`
              }
            }
          }
        },
        series: [{
          data: [0]
        }]
      }
    }
  },
  created () {
    this.$getAppToken()
    this.getPickerYearList()
    this.getCurrentdate()
    HighchartsMore(Highcharts)
    this.getTaskDate()
  },
  methods: {
    closeWebview () {
      this.$closeWebview()
    },
    // 显示日期选择
    pickDate () {
      this.pickerVisible = true
    },
    cancel () {
      this.result = 'click cancel result: null'
    },
    confirm (res) {
      this.result = res[0].value + '-' + res[1].value
      this.dateText = res[0].value + '年' + res[1].value + '月'
      this.getTaskDate()
    },
    // 获取年份数据
    getPickerYearList () {
      const nowYear = new Date().getFullYear()
      const yearList = []
      for (let i = 0; i < 20; i++) {
        yearList.push(
          {
            value: nowYear - i,
            label: nowYear - i
          }
        )
      }
      this.pickData[0] = yearList
    },
    // 获取当前年月
    getCurrentdate () {
      const nowYear = new Date().getFullYear()
      const toMoth = (new Date().getMonth() + 1)
      const nowMoth = toMoth < 10 ? '0' + toMoth : toMoth
      this.result = nowYear + '-' + nowMoth
      this.dateText = nowYear + '年' + nowMoth + '月'
    },
    // 设置仪表盘指针颜色
    chartOpt (data, chartName) {
      let color = data < 33 ? '#f32f47' : (data < 67 ? '#f98b00' : '#55feb9')
      this[chartName].plotOptions.gauge.dial.backgroundColor = color
      this[chartName].plotOptions.gauge.pivot.borderColor = color
      this[chartName].plotOptions.gauge.pivot.backgroundColor = color
      this[chartName].series[0].data = [data]
    },
    getTaskDate () {
      getTask({ taskTime: this.result }).then(res => {
        const resData = res.data.data
        if (Object.keys(resData).length === 0) {
          this.spotNum = 0
          this.gameNum = 0
          this.eventNum = 0
          this.joinNum = 0
          this.feeNum = 0
          this.chartOpt(0, 'spotNumOptions')
          this.chartOpt(0, 'gameNumOptions')
          this.chartOpt(0, 'eventNumOptions')
          this.chartOpt(0, 'joinNumOptions')
          this.chartOpt(0, 'feeNumOptions')
          return
        }
        this.spotNum = resData.spotCount
        this.gameNum = resData.gameCount
        this.eventNum = resData.activityCount
        this.joinNum = resData.applicationCount
        this.feeNum = resData.feeCount
        this.chartOpt(resData.spotPercentage, 'spotNumOptions')
        this.chartOpt(resData.gamePercentage, 'gameNumOptions')
        this.chartOpt(resData.activityPercentage, 'eventNumOptions')
        this.chartOpt(resData.applicationPercentage, 'joinNumOptions')
        this.chartOpt(resData.feePercentage, 'feeNumOptions')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.spotData{
  min-height: 100%;
  background: #151530;
  // background: transparent;
}
.date_pick{
  padding: .4rem;
  color: #fff;
  .date_text{
    position: relative;
    &::after{
      content: '';
      display: block;
      width: 0;
      position: absolute;
      right: -0.4rem;
      top: 40%;
      border-width: .133333rem;
      border-style: solid;
      border-color:#fff transparent transparent transparent;
    }
  }
}
.content{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 0 .266667rem .8rem;
  .item{
    width: 47%;
    // height: 5.333333rem;
    // background: gray;
    overflow: hidden;
    text-align: center;
    color: #ffffff;
    .text{
      margin-bottom: .213333rem;
    }
  }
}
</style>
