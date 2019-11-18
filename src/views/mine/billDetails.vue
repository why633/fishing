<template>
  <div class="billDetails">
    <top-title>账单明细</top-title>
    <div :class="['date-picker',dateText == '请选择时间'?'default':'']" @click="pickDate">{{ dateText }}</div>
    <div class="bill-list">
      <div class="item">
        <div class="left-info">
          <div class="title">
            充值
            <span class="sub-title">（钱包充值）</span>
          </div>
          <div class="date">19 11月01日 11:05</div>
        </div>
        <div class="right-info">
          <span>0.01</span>
        </div>
      </div>
    </div>
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
export default {
  data () {
    return {
      pickerValue: '',
      pickerVisible: false,
      dateText: '请选择时间',
      pickData: [
        [
          {
            label: '2019',
            value: '2019'
          },
          {
            label: '2018',
            value: '2018'
          },
          {
            label: '2017',
            value: '2017'
          },
          {
            label: '2016',
            value: '2016'
          },
          {
            label: '2015',
            value: '2015'
          },
          {
            label: '2014',
            value: '2014'
          }
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
      result: ''
    }
  },
  created () {
    this.getPickerYearList()
  },
  methods: {
    pickDate () {
      this.pickerVisible = true
    },
    cancel () {
      this.result = 'click cancel result: null'
    },
    confirm (res) {
      this.result = JSON.stringify(res)
      console.log(res)
      this.dateText = res[0].value + '年' + res[1].value + '月'
    },
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
      console.log(yearList)
      this.pickData[0] = yearList
    }
  }
}
</script>

<style lang="scss" scoped>
.billDetails {
  min-height: 100vh;
  background: #fff;
}
.date-picker {
  height: 1.17333rem;
  line-height: 1.17333rem;
  background: #efefef;
  font-size: 0.426667rem;
  padding-left: 0.426667rem;
}
.default {
  color: gray;
}

.bill-list {
  padding: 0 0.266667rem 0 0.4rem;
  .item {
    display: flex;
    padding: 0.4rem 0 0.266667rem 0;
    border-bottom: 1px solid #efefef;
    align-items: center;
    .left-info {
      flex: 1;
      .title {
        margin-bottom: 0.266667rem;
        .sub-title {
          font-size: 0.32rem;
        }
      }
      .date {
        font-size: 0.32rem;
        color: gray;
      }
    }
    .right-info {
      max-width: 3.333333rem;
      padding: 0 0.213333rem;
      text-align: center;
      font-size: 0.48rem;
      word-wrap: break-word;
    }
  }
}
</style>
