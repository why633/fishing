<template>
  <div class="collectFish">
    <top-title>一键收鱼</top-title>
    <div class="content">
      <div class="label">
        <div class="name">鱼获总量：</div>
        <div class="input">
          <input type="text" v-model="fishCount">
        </div>
        <div class="unit">斤</div>
      </div>
      <div class="label">
        <div class="name">收鱼：</div>
        <div class="input">
          <input type="text" v-model="price">
        </div>
        <div class="unit">元/斤</div>
      </div>
      <div class="label">
        <div class="name">支付金额：</div>
        <div class="input">
          <input v-model="totalPrice" type="text">
        </div>
        <div class="unit">元</div>
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
        <span class="confirm-text">您将支付 <span class="price">{{totalPrice}}</span> 元</span>
      </span>
    </Dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      showDialog: false,
      fishCount: '',
      price: '',
      totalPrice: ''
    }
  },
  created () {
    this.id = this.$route.query.id
    console.log(this.id)
  },
  methods: {
    closeDialog () {
      this.showDialog = false
    },
    dialogConfirm () {
      // delEvent({ eventId: this.eventId }).then(res => {
      //   console.log(res)
      //   this.activeList.splice(this.delIndex, 1)
      //   this.$toast.show({
      //     text: '取消成功'
      //   })
      // }).catch(err => {
      //   console.log(err)
      // })
      this.showDialog = false
    },
    pay () {
      if (this.fishCount === '') {
        this.$toast.show({
          text: '请输入鱼获总量'
        })
        return
      }
      if (this.price === '') {
        this.$toast.show({
          text: '请输入收鱼单价'
        })
        return
      }
      if (this.totalPrice === '') {
        this.$toast.show({
          text: '请输入金额'
        })
        return
      }
      this.showDialog = true
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
  margin-bottom: .266667rem;
  .name{
    width: 2rem;
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
</style>
