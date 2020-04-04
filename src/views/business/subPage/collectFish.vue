<template>
  <div class="collectFish">
    <top-title>一键收鱼</top-title>
    <div class="content">
      <div class="label">
        <div class="name">
          <span class="must-start">鱼获总量：</span>
        </div>
        <div class="input">
          <input type="number" v-model="fishCount">
        </div>
        <div class="unit">斤</div>
      </div>
      <div class="label">
        <div class="name">
          <span class="must-start">收鱼单价：</span>
        </div>
        <div class="input">
          <input type="number" v-model="price">
        </div>
        <div class="unit">元/斤</div>
      </div>
      <div class="label">
        <div class="name">标鱼：</div>
        <div class="input">
          <input v-model="targetFish">
        </div>
        <div class="unit">元</div>
      </div>
      <div class="label">
        <div class="name">支付金额：</div>
        <div class="totalPrice">
          <span class="priceNum">{{ isNumber(fishCount * price + (targetFish - 0))?(thisFixedA(thisFixedM(fishCount, price), (targetFish - 0))).toFixed(2): 0 }}</span>
          <span class="y">元</span>
        </div>
        <!-- <div class="unit">元</div> -->
      </div>
      <div class="pay-btn" @click="pay">付款</div>
    </div>
    <Dialog
      :showDialog="showDialog"
      :msg="''"
      @close-dialog="closeDialog"
      @dialog-confirm="dialogConfirm"
    >
      <span slot="content">
        <span class="confirm-text">您将支付 <span class="price">{{ (thisFixedA(thisFixedM(fishCount, price), (targetFish - 0))).toFixed(2) }}</span> 元</span>
      </span>
    </Dialog>
  </div>
</template>

<script>
import keyboardHandle from '@/utils/keyboardHandle'
import { isNum, twoFloat } from '@/utils/regMethod'
import { harvesting } from '@/api'
import { fixedA, fixedM } from '@/utils/toFixed'
export default {
  data () {
    return {
      id: '1',
      showDialog: false,
      fishCount: '',
      price: '',
      targetFish: '',
      loading: false
    }
  },
  mounted () {
    this.$getAppToken()
  },
  created () {
    this.id = this.$route.query.id
    console.log(this.id)
    // 处理键盘弹起收起
    keyboardHandle()
  },
  methods: {
    thisFixedA: fixedA,
    thisFixedM: fixedM,
    isNumber (num) {
      return isNum(num)
    },
    // 付款
    pay () {
      if (this.fishCount.trim() === '') {
        this.$toast.show({
          text: '请输入鱼获总量'
        })
        return
      }
      if (!isNum(this.fishCount.trim())) {
        this.$toast.show({
          text: '请输入正确鱼获总量'
        })
        return
      }
      if (!twoFloat(this.fishCount.trim())) {
        this.$toast.show({
          text: '最多只能输入两位小数'
        })
        return
      }
      if (this.price.trim() === '') {
        this.$toast.show({
          text: '请输入收鱼单价'
        })
        return
      }
      if (!isNum(this.price.trim())) {
        this.$toast.show({
          text: '请输入正确收鱼单价'
        })
        return
      }
      if (!twoFloat(this.price.trim())) {
        this.$toast.show({
          text: '最多只能输入两位小数'
        })
        return
      }
      if (!isNum(this.targetFish.trim()) && (this.targetFish !== '')) {
        this.$toast.show({
          text: '请输入正确标鱼金额'
        })
        return
      }
      if (this.loading) {
        return
      }
      this.showDialog = true
    },
    closeDialog () {
      this.showDialog = false
    },
    // 付款确认
    dialogConfirm () {
      console.log(this.loading)
      if (this.loading) {
        console.log('loading')
        return
      }
      console.log('qq')
      this.loading = true
      const params = {
        applicationId: this.id,
        buyBackCount: this.fishCount,
        buyBackPrice: this.price,
        buyBackMoney: this.fishCount * this.price + (this.targetFish - 0)
      }
      harvesting(JSON.stringify(params)).then(res => {
        console.log(res)
        this.showDialog = false
        const _this = this
        setTimeout(function () {
          _this.loading = false
        }, 400)
        this.$toast.show({
          text: '收鱼成功',
          callBack: function () {
            _this.$router.go(-1)
          }
        })
      }).catch(err => {
        console.log(err)
        const _this = this
        setTimeout(function () {
          _this.loading = false
        }, 400)
        this.showDialog = false
        this.fishCount = ''
        this.price = ''
        this.targetFish = ''
      })
    },
    setTargetFish (val) {
      console.log('setTargetFish:' + val)
      this.targetFish = val
    }
  }
}
</script>

<style lang="scss" scoped>
.collectFish{
  min-height: 100%;
  background: #fff;
}
.content{
  padding: .8rem .533333rem;
}
.label{
  display: flex;
  height: 1.066667rem;
  line-height: 1.066667rem;
  margin-bottom: .533333rem;
  font-size: .4rem;
  .must-start{
    position: relative;
    &::before{
      content: '*';
      position: absolute;
      color: red;
      left: -0.213333rem;
    }
  }
  .name{
    width: 2.133333rem;
    text-align: right;
  }
  .input{
    margin: 0 .133333rem;
    width: 60%;
    input{
      width: 100%;
      border: 1px solid #efefef;
      border-radius: 0.13333rem;
      outline: none;
      padding: .16rem 0.13333rem;
      -webkit-appearance: none;
    }
  }
}
.confirm-text{
  font-size: .4rem;
  .price{
    font-size: .426667rem;
    font-weight: 700;
  }
}
.pay-btn{
  width: 3.2rem;
  text-align: center;
  padding: .373333rem 0;
  border-radius: .16rem;
  color: #fff;
  background: rgb(75, 175, 241);
  font-size: .426667rem;
  margin: 1.333333rem auto 0;
}
.totalPrice{
  .priceNum{
    font-size: .666667rem;
    float: left;
    margin-right: .133333rem;
  }
  .y{
    float: left;
  }
}
</style>
