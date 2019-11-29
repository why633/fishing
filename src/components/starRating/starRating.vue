<template>
  <div class="starRating">
    <i v-for="(item,index) in itemClasses" :key="index" class="fa" :class="item"></i>
  </div>
</template>

<script>
// 星星长度
const LENGTH = 5
// 星星对应的class,亮星
const CLS_ON = 'fa-star'
// 半星
const CLS_HALF = 'fa-star-half-empty'
// 灰星
const CLS_OFF = 'gray-star'

export default {
  name: 'starRating',
  props: {
    rating: {
      type: Number,
      default: 0
    }
  },
  computed: {
    itemClasses () {
      // 如4.8 四个全星 1个半星
      let result = []
      // 对分数进行处理, 向下取0.5的倍数
      let score = Math.floor(this.rating * 2) / 2
      // 控制半星
      let hasDecimal = score % 1 !== 0
      // 全星
      let integer = Math.floor(score)
      // 全星放入到数组中
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 半星
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 补齐
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.starRating {
  width: 2.26667rem;
  height: .34667rem;
  background: #fff;
  display: flex;
  justify-content: space-between;
  .fa{
    display: inline-block;
    width: .34667rem;
    height: .34667rem;
    background: red;
  }
  .fa-star{
    background: url('./images/star_full.png');
    background-size: 100% 100%;
  }
  .gray-star{
    background: url('./images/star_none.png');
    background-size: 100% 100%;
  }
  .fa-star-half-empty{
    background: url('./images/star_half.png');
    background-size: 100% 100%;
  }
}
</style>
