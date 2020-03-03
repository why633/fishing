<template>
  <div class="spotData">
    <top-title :isBackPre="isBack" @backClick="closeWebview">钓场数据</top-title>
    <div class="content">
      <div class="item">
        <highcharts ref="spotNum" :options="spotNumOptions"></highcharts>
        <div class="text">签约钓场数量</div>
        <div class="num">4个</div>
      </div>
    </div>
    <!-- <Grow :value="100" /> -->
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
      isBack: false,
      spotNumOptions: {
        yAxis: {
          min: 0,
          max: 100,
          title: {
            text: ''
          }
        },
        series: [{
          name: '速度',
          data: [30],
          dataLabels: {
            format: '<span style="color:#ffffff;font-weight:normal;">超过{y}%的专员</span>'
          },
          tooltip: {
            valueSuffix: ' %'
          }
        }]
      }
    }
  },
  created () {
    this.chartConConfig()
  },
  methods: {
    closeWebview () {
      this.$closeWebview()
    },
    // 图表公共配置
    chartConConfig () {
      // 公共配置
      HighchartsMore(Highcharts)
      SolidGauge(Highcharts)
      Highcharts.setOptions({
        chart: {
          type: 'solidgauge',
          backgroundColor: 'pink',
          height: '170',
          margin: [0, 0, 0, 0],
          spacing: [0, 0, 0, 0]
        },
        credits: {
          enabled: false
        },
        title: null,
        pane: {
          center: ['50%', '66%'],
          size: '100%',
          startAngle: -120,
          endAngle: 120,
          background: {
            backgroundColor: '#ffffff',
            borderWidth: 0,
            innerRadius: '80%',
            outerRadius: '100%',
            shape: 'arc'
          }
        },
        tooltip: {
          enabled: false
        },
        yAxis: {
          stops: [
            // [0.1, '#55BF3B'], // green
            // [0.5, '#DDDF0D'], // yellow
            // [0.9, '#DF5353'] // red

            [0.1, '#3EBDC6'],
            [0.3, '#64BB5B'],
            [0.5, '#F493BC'],
            [0.6, '#C47674'],
            [0.8, '#F9C54F'],
            [0.9, '#E64E4D']
          ],
          lineWidth: 0,
          minorTickInterval: null,
          tickPixelInterval: 400,
          tickWidth: 0,
          title: {
            y: -70
          },
          labels: {
            y: 16
          }
        },
        plotOptions: {
          solidgauge: {
            dataLabels: {
              y: 16,
              borderWidth: 0,
              useHTML: true
            }
          },
          series: {
            borderWidth: 0
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.spotData{
  height: 100%;
  background: #151530;
}
.content{
  .item{
    width: 50%;
    height: 5.333333rem;
    background: gray;
    text-align: center;
    color: #ffffff;
  }
}
</style>
