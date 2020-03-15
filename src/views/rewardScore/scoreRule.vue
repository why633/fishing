<template>
  <div class="scoreRule">
    <top-title>会员等级权益说明</top-title>
    <div class="content">
      <div class="title">
        <span class="text">会员权益说明</span>
      </div>
      <div class="range-table">
        <div class="row">
          <div class="th">会员等级</div>
          <div class="th">积分奖励</div>
          <div class="th">专属商品</div>
        </div>
        <div class="row">
          <div class="td">银卡会员</div>
          <div class="td">1.1倍</div>
          <div class="td">可兑换</div>
        </div>
        <div class="row">
          <div class="td">金卡会员</div>
          <div class="td">1.3倍</div>
          <div class="td">可兑换</div>
        </div>
        <div class="row">
          <div class="td">白金卡会员</div>
          <div class="td">1.5倍</div>
          <div class="td">可兑换</div>
        </div>
      </div>
      <div class="tips">普通会员为1倍积分奖励，不可兑换专属商品</div>
      <div class="title">
        <span class="text">升降级说明</span>
      </div>
      <div class="rule-table">
        <div class="row">
          <div class="th">
            <span>会员等级</span>
          </div>
          <div class="th">
            <span>升级标准</span>
          </div>
          <div class="th">
            <span>保级标准<br>（24个月）</span>
          </div>
        </div>
        <div class="row">
          <div class="td">
            <span>白金卡会员</span>
          </div>
          <div class="td">
            <span>满15000元赛事报名消费或满60次赛事报名消费</span>
          </div>
          <div class="td">
            <span>满10000元赛事报名消费或满50次赛事报名消费</span>
          </div>
        </div>
        <div class="row">
          <div class="td">
            <span>金卡会员</span>
          </div>
          <div class="td">
            <span>满6000元赛事报名消费或满30次赛事报名消费</span>
          </div>
          <div class="td">
            <span>满4000元赛事报名消费或满25次赛事报名消费</span>
          </div>
        </div>
        <div class="row">
          <div class="td">
            <span>银卡会员</span>
          </div>
          <div class="td">
            <span>满2000元赛事报名消费或满10次赛事报名消费</span>
          </div>
          <div class="td">
            <span>满1500元赛事报名消费或满8次赛事报名消费</span>
          </div>
        </div>
        <div class="row">
          <div class="td">
            <span>普通会员</span>
          </div>
          <div class="td">
            <span>无</span>
          </div>
          <div class="td">
            <span>无</span>
          </div>
        </div>
      </div>
      <div class="others">
        <h4>其它升降级说明：</h4>
        <div class="text">
          1.对于报名非赛事的活动消费，升级条件为：累计消费需达到相应会员等级赛事消费标准的10倍金额后可升级，例如：用户当前等级为普通会员，报名非赛事的活动，用户消费达到20000元后即可升级为银卡会员；
        </div>
        <div class="text">
          2.达到升级标准后，需在24个月内达到相应等级的保级标准，否则会降级到上一会员等级。或报名非赛事活动消费累计达到相应会员等级赛事消费标准的10倍金额后可保级；
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scoreRule{
  min-height: 100%;
  background: #fff;
  color: #333;
}
.content{
  padding: .533333rem;
}
.title{
  text-align: center;
  line-height: 1.066667rem;
  .text{
    font-size: .48rem;
    position: relative;
    &::before{
      content:'';
      position: absolute;
      width: 2.666667rem;
      height: 1px;
      background: #333;
      top: 50%;
      left: -3rem;
    }
    &::after{
      content:'';
      position: absolute;
      width: 2.666667rem;
      height: 1px;
      background: #333;
      top: 50%;
      right: -3rem;
    }
  }
}
.range-table{
  .row{
    display: flex;
    text-align: center;
    .th{
      flex: 1;
      font-weight: 700;
      line-height: .8rem;
    }
    .td{
      flex: 1;
      line-height: .8rem;
    }
  }
}
.tips{
  position: relative;
  padding: .533333rem;
  box-sizing: border-box;
  &::before{
    content: '*';
    color: red;
    position: absolute;
    left: .373333rem;
  }
}
.rule-table{
  .row{
    display: flex;
    text-align: center;
    justify-content: space-around;
    align-items: center;
    &:first-child{
      background: #eee;
    }
    &:last-child{
      border-bottom: 1px solid #333;
    }
    .th{
      font-weight: 700;
      border-top: 1px solid #333;
      border-left: 1px solid #333;
      height: 1.2rem;
      line-height: 1.4;
      position: relative;
      &:nth-child(1){
        flex: 2;
      }
      &:nth-child(2){
        flex: 3;
      }
      &:nth-child(3){
        flex: 3;
        border-right: 1px solid #333;
      }
      span{
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
    .td{
      line-height: 1.4;
      border-top: 1px solid #333;
      border-left: 1px solid #333;
      height: 1.8rem;
      position: relative;
      &:nth-child(1){
        flex: 2;
      }
      &:nth-child(2){
        flex: 3;
        text-align: left;
      }
      &:nth-child(3){
        flex: 3;
        text-align: left;
        border-right: 1px solid #333;
      }
      // line-height: .8rem;
      span{
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        padding: .16rem;
      }
    }
  }
}
.others{
  padding: .8rem 0;
  .text{
    line-height: 1.4;
    margin-top: .266667rem;
  }
}
</style>
