<template>
  <div class="picker">
    <mt-popup class="popup" v-model="popupVisible" position="bottom">
      <div class="btn">
        <span>取消</span>
        <span>确定</span>
      </div>
      <div class="picker-wrap">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      popupVisible: true,
      slots: [
        {
          flex: 1,
          values: ['2019', '2018', '2017', '2016', '2015', '2014'],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
          className: 'slot3',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    onValuesChange (picker, values) {
    }
  }
}
</script>
<style lang="scss" scoped>
.popup {
  width: 100%;
}
.picker-wrap {
  width: 100%;
  text-align: center !important;
  .picker-item {
  }
}
</style>
