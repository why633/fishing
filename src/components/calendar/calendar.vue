<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content bg_g">
        <div class="wh_content_item" v-for="tag in textTop" :key="tag.id">
          <div class="wh_top_tag">{{tag}}</div>
        </div>
      </div>
      <div class="wh_content">
        <div
          class="wh_content_item"
          v-for="(item,index) in list"
          :key="index"
        >
        <!-- <div
          class="wh_content_item"
          v-for="(item,index) in list"
          @click="clickDay(item,index)"
          :key="index"
        > -->
          <div
            class="wh_item_date"
            v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},setClass(item)]"
          ><span>{{item.id}}</span></div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar'
export default {
  data () {
    return {
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ''
    }
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ['一', '二', '三', '四', '五', '六', '日']
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    }
  },
  created () {
    this.intStart()
    this.myDate = new Date()
  },
  methods: {
    intStart () {
      timeUtil.sundayStart = this.sundayStart
    },
    setClass (data) {
      let obj = {}
      obj[data.markClassName] = data.markClassName
      return obj
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date)
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date)
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = new Date(date)
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date)
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth')
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate))
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay)
      } else {
        this.getList(this.myDate)
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate
      let markDateMore = this.markDateMore
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k)
      })
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date)
        return k
      })
      return [markDate, markDateMore]
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs()
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`
      let arr = timeUtil.getMonthList(this.myDate)
      for (let i = 0; i < arr.length; i++) {
        let markClassName = ''
        let k = arr[i]
        k.chooseDay = false
        const nowTime = k.date
        const t = new Date(nowTime).getTime() / 1000
        // 看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || ''
          }
        }
        // 标记选中某些天 设置class
        k.markClassName = markClassName
        k.isMark = markDate.indexOf(nowTime) > -1
        // 无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide
        if (k.isToday) {
          this.$emit('isToday', nowTime)
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth'
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime)
          this.historyChose.push(nowTime)
          k.chooseDay = true
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true
        }
      }
      this.list = arr
    }
  },
  mounted () {
    this.getList(this.myDate)
  },
  watch: {
    markDate: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    markDateMore: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    agoDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    futureDayHide: {
      handler (val, oldVal) {
        this.getList(this.myDate)
      },
      deep: true
    },
    sundayStart: {
      handler (val, oldVal) {
        this.intStart()
        this.getList(this.myDate)
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.bg_g{
  background: #f4f4f4;
}
.wh_container {
  width: 100%;
  margin: auto;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
  background: #f4f4f4;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #333;
  font-size: .4rem;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 1.2rem;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: .106667rem;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: .213333rem;
}

.wh_content_item,
.wh_content_item_tag {
  font-size: .4rem;
  width: 14.28%;
  text-align: center;
  color: #333;
  position: relative;
}
.wh_content_item {
  height: 1.2rem;
  padding: .066667rem;
}

.wh_top_tag {
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  margin: .1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: .16rem;
  height: .16rem;
  border-top: .026667rem solid #333;
  border-left: .026667rem solid #333;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: .16rem;
  height: .16rem;
  border-top: .026667rem solid #333;
  border-right: .026667rem solid #333;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: .2rem auto;
  border-radius: 1.333333rem;
  /* background: red; */
  z-index: 2;
  font-size: .293333rem;
  position: relative;
  line-height: .4rem;
}
.wh_content_item > .wh_isMark::after{
  content: "";
  display: block;
  width: .6rem;
  height: .6rem;
  background: url('./images/selected.png');
  background-size: 100% 100%;
  position: absolute;
  bottom: .053333rem;
}
.wh_content_item > .wh_isMark span {
  position: absolute;
  top: .053333rem;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
  visibility: hidden;
  /* 隐藏非本月日 */
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: #f4f4f4;
  border-radius: 1.333333rem;
}
.wh_content_item .wh_chose_day {
  background: green;
  border-radius: 1.333333rem;
}
</style>
