<template>
  <div class="scoreRule">
    <div class="content">
      <div class="block">
        <div class="title-wrap"><span class="title">会员等级</span><span class="icon"></span></div>
        <highcharts ref="chart" :options="chartOptions"></highcharts>
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
      chartOptions: {
        chart: {
          type: 'solidgauge',
          height: '160',
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
          center: ['25%', '60%'],
          size: '100%',
          startAngle: -125,
          endAngle: 125,
          background: [
            {
              backgroundColor: '#EEE',
              borderWidth: 0,
              innerRadius: '85%',
              outerRadius: '100%',
              shape: 'arc'
            },
            {
              backgroundColor: '#EEE',
              borderWidth: 0,
              innerRadius: '60%',
              outerRadius: '75%',
              shape: 'arc'
            },
            {
              backgroundColor: '#EEE',
              borderWidth: 0,
              innerRadius: '35%',
              outerRadius: '50%',
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
                return '<div style="width:0.6rem;height:0.6rem;background: pink;"></div>'
              }
            },
            showInLegend: true // 显示在图例中
          }
        },
        series: [
          {
            name: '赛事报名消费',
            data: [
              {
                radius: '100%',
                innerRadius: '85%',
                color: '#d5ab64',
                y: 80
              }
            ],
            dataLabels: {
              // enabled: false,
              x: 200,
              y: -80,
              formatter: function () {
                console.log(this)
                return `<div style="height:0.5rem;line-height:0.5rem;"><span style="display:inline-block; float: left; width:.32rem;height:.32rem;background:#d5ab64;margin-top:0.06rem;margin-right: 0.1rem;border-radius:50%;"></span><span>${this.series.name}</span><span style="color:#d5ab64;">${this.y}%</span></div>`
              }
            }
          },
          {
            name: '赛事报名次数',
            data: [
              {
                radius: '75%',
                innerRadius: '60%',
                color: '#1c53a3',
                y: 60
              }
            ],
            dataLabels: {
              // enabled: false,
            }
          },
          {
            name: '活动报名费用',
            data: [
              {
                radius: '50%',
                innerRadius: '35%',
                color: '#c65e50',
                y: 20
              }
            ],
            dataLabels: {
              // enabled: false,
            }
          }
        ]
      }
    }
  },
  mounted () {

  },
  created () {
    HighchartsMore(Highcharts)
    SolidGauge(Highcharts)
  }
}
</script>

<style lang="scss" scoped>
.scoreRule{
  min-height: 100%;
  background: #ffffff;
}
.content{
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
    background: pink;
    float: right;
  }
}
</style>
