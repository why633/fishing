<template>
  <div class="billDetails">
    <top-title :isBackPre="false" @backClick="closeWebview">账单明细</top-title>
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div
        :class="['date-picker',dateText == '请选择时间'?'default':'']"
        @click="pickDate"
      >{{ dateText }}</div>
      <div class="bill-list" id="dataList">
        <div class="item" v-for="(item,index) in billData" :key="index">
          <div class="left-info">
            <div class="title">
              {{item.description}}
              <span class="sub-title">（{{item.status}}）</span>
            </div>
            <div class="date">{{item.createTime|formateDateTime}}</div>
          </div>
          <div class="right-info">
            <span :class="{'red':item.amount.indexOf('+')!=-1}">{{item.amount}}</span>
          </div>
        </div>
      </div>
    </mescroll-vue>
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
import { billDetails } from '@/api'
export default {
  data () {
    return {
      pickerValue: '',
      pickerVisible: false,
      dateText: '请选择时间',
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
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      billData: [],
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        auto: false,
        isLock: true,
        mustToTop: true
      },
      mescrollUp: {
        auto: true,
        offset: 10,
        isBounce: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page, mescroll) { getListData(page); }
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 10 // 每页数据的数量
        },
        htmlNodata: '<p class="upwarp-nodata">-- 无更多数据 --</p>',
        noMoreSize: 10, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        // toTop: {
        //   // src: './static/mescroll/mescroll-totop.png' // 回到顶部按钮的图片路径,支持网络图
        // },
        empty: {
          // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
          warpId: 'dataList', // 父布局的id;
          // icon: './static/mescroll/mescroll-empty.png', // 图标,支持网络图
          tip: '暂无相关数据~', // 提示
          btntext: '' // 按钮,默认""
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
  created () {
    this.$getAppToken()
    this.getPickerYearList()
  },
  methods: {
    closeWebview () {
      this.$closeWebview()
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback (page, mescroll) {
      console.log('up')
      const _this = this
      // 数据渲染成功后,隐藏下拉刷新的状态
      setTimeout(function () {
        _this.getBillDetails(page.num).then(res => {
          _this.$nextTick(() => {
            mescroll.endSuccess(res)
          })
        }).catch(err => {
          console.log(err)
          mescroll.endErr()
        })
      }, 200)
    },
    pickDate () {
      this.pickerVisible = true
    },
    cancel () {
      this.result = 'click cancel result: null'
    },
    confirm (res) {
      this.result = res[0].value + '-' + res[1].value
      this.dateText = res[0].value + '年' + res[1].value + '月'
      this.billData = []
      this.mescroll.resetUpScroll()
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
      this.pickData[0] = yearList
    },
    // 获取账单列表
    getBillDetails (pageNo) {
      return new Promise((resolve, reject) => {
        const params = {
          createTime: this.result,
          pageNo: pageNo,
          pageSize: this.pageSize
        }
        billDetails(params).then(res => {
          const resData = res.data.data
          this.billData = pageNo === 1 ? resData.list : this.billData.concat(resData.list)
          resolve(resData.list.length)
        }).catch(err => {
          reject(err)
        })
      })
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
      .red{
        color: red;
      }
    }
  }
}
.no-data {
  color: gray;
  text-align: center;
  width: 100%;
  position: absolute;
  top: 45%;
}
</style>
