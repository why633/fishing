<template>
  <div class="addAddress">
    <top-title>编辑收货地址</top-title>
    <div class="content">
      <div class="form">
        <mt-field class="form-item must" label="收货人：" placeholder="请填写收货人姓名" v-model="form.name"></mt-field>
        <mt-field
          class="form-item must"
          label="联系电话："
          placeholder="请填写收货人联系电话"
          type="number"
          v-model="form.phone"
        ></mt-field>
        <!-- <mt-field
          class="form-item must"
          label="所在地区："
          placeholder="请填写收货人姓名"
          v-model="form.username"
        ></mt-field>-->
        <mt-cell class="form-switch must" title="所在地区：" is-link @click.native="showChoseAddress">
          <div :class="{'black': addressText!='请选择地区'}">{{addressText}}</div>
        </mt-cell>
        <mt-field
          class="form-item must form-item-textarea"
          label="详细地址："
          type="textarea"
          rows="4"
          placeholder="详细地址，如：道路、门牌号、校区、楼号、单元、寝等"
          v-model="form.address"
        ></mt-field>
        <mt-cell class="form-switch lage-lable" title="设为默认地址">
          <mt-switch v-model="form.acquiesce" @change="changeAcquiesce"></mt-switch>
        </mt-cell>
        <div class="btn-box">
          <div class="del-btn" v-hover @click="delAddress">删除</div>
          <div class="add-btn" v-hover @click="save">保存</div>
        </div>
      </div>
      <mt-popup class="address-popup" v-model="choseAddressVisible" position="bottom">
        <div class="address-content">
          <div class="tilte">
            <h4>请选择所在地区</h4>
            <span class="close" @click="closeAddressPopup">
              <img :src="closeIcon" alt />
            </span>
          </div>
          <div class="tab">
            <span
              class="tab-item"
              :class="{'active' : tabData.provinceTab.active}"
              v-if="tabData.provinceTab.name"
              @click="provinceTabClick"
            >{{tabData.provinceTab.name}}</span>
            <span
              class="tab-item"
              :class="{'active' : tabData.cityTab.active}"
              v-if="tabData.cityTab.name"
              @click="cityTabClick"
            >{{tabData.cityTab.name}}</span>
            <span
              class="tab-item"
              :class="{'active' : tabData.areaTab.active}"
              v-if="tabData.areaTab.name"
              @click="areaTabClick"
            >{{tabData.areaTab.name}}</span>
            <span
              class="tab-item"
              :class="{'active' : tabData.choseTab.active}"
              v-if="tabData.areaTab.name == ''"
            >{{tabData.choseTab.name}}</span>
          </div>
          <transition name="fade">
            <div class="province-content" v-if="provinceShow">
              <div
                class="item"
                @click="choseProvince(provinceItem, index)"
                v-for="(provinceItem, index) in provinceData"
                :key="index"
              >
                <span class="choseIcon" v-if="provinceItem.active">
                  <img :src="choseIcon" alt />
                </span>
                {{provinceItem.name}}
              </div>
            </div>
          </transition>
          <transition name="fade">
            <div class="city-content" v-if="cityShow">
              <div
                class="item"
                @click="choseCity(cityItem, index)"
                v-for="(cityItem, index) in cityData"
                :key="index"
              >
                <span class="choseIcon" v-if="cityItem.active">
                  <img :src="choseIcon" alt />
                </span>
                {{cityItem.name}}
              </div>
            </div>
          </transition>
          <transition name="fade">
            <div class="area-content" v-if="areaShow">
              <div
                class="item"
                @click="choseArea(areaItem, index)"
                v-for="(areaItem, index) in areaData"
                :key="index"
              >
                <span class="choseIcon" v-if="areaItem.active">
                  <img :src="choseIcon" alt />
                </span>
                {{areaItem.name}}
              </div>
            </div>
          </transition>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import keyboardHandle from '@/utils/keyboardHandle'
import { Field, Switch, Cell, Popup } from 'mint-ui'
import Vue from 'vue'
import { province, city, updateAddress, detailAddress, delAddress } from '@/api/index'
Vue.component(Field.name, Field)
Vue.component(Switch.name, Switch)
Vue.component(Cell.name, Cell)
Vue.component(Popup.name, Popup)
export default {
  data () {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        acquiesce: false
      },
      addressText: '请选择地区',
      choseAddressVisible: false,
      closeIcon: require('@/assets/close.png'),
      choseIcon: require('@/assets/chose.png'),
      tabData: {
        provinceTab: {
          name: '',
          id: '',
          active: false
        },
        cityTab: {
          name: '',
          id: '',
          active: false
        },
        areaTab: {
          name: '',
          id: '',
          active: false
        },
        choseTab: {
          name: '请选择',
          id: '-10',
          active: true
        }
      },
      provinceData: [],
      provinceShow: true,
      cityData: [],
      cityShow: false,
      areaData: [],
      areaShow: false,
      saveLoading: false,
      delLoading: false
    }
  },
  created () {
    this.getProvince()
    // 处理键盘弹起收起
    keyboardHandle()
    this.getDetailAddress()
  },
  methods: {
    showChoseAddress () {
      console.log('12')
      this.choseAddressVisible = true
    },
    closeAddressPopup () {
      this.choseAddressVisible = false
    },
    // 省份tab点击
    provinceTabClick () {
      this.tabData.provinceTab.active = true
      this.tabData.cityTab.active = false
      this.tabData.areaTab.active = false
      this.tabData.choseTab.active = false
      this.provinceShow = true
      this.cityShow = false
      this.areaShow = false
      //   this.cityData = []
    },
    // 城市tab点击
    cityTabClick () {
      this.tabData.cityTab.active = true
      this.tabData.provinceTab.active = false
      this.tabData.areaTab.active = false
      this.tabData.choseTab.active = false
      this.cityShow = true
      this.provinceShow = false
      this.areaShow = false
    },
    // 县tab点击
    areaTabClick () {
      this.tabData.areaTab.active = true
      this.tabData.provinceTab.active = false
      this.tabData.cityTab.active = false
      this.tabData.choseTab.active = false
      this.cityShow = false
      this.provinceShow = false
      this.areaShow = true
    },
    // 获取省份数据
    getProvince () {
      province().then(res => {
        console.log(res)
        this.provinceData = res.data.data
      })
    },
    // 点击选择省份
    choseProvince (province, idx) {
      console.log(province)
      const provinceId = province.id
      this.tabData.provinceTab = { ...province, active: false }
      this.getCityData(provinceId).then(res => {
        this.provinceShow = false
        this.cityShow = true
        this.tabData.choseTab.active = true
        // 清空城市数据
        this.tabData.cityTab.active = false
        this.tabData.cityTab.name = ''
        this.tabData.cityTab.id = ''
        // 清空区县数据
        this.tabData.areaTab.active = false
        this.tabData.areaTab.name = ''
        this.tabData.areaTab.id = ''
        this.provinceData = this.provinceData.filter(function (item) {
          if (item.id === provinceId) {
            item.active = true
          } else {
            item.active = false
          }
          return item
        })
      })
    },
    // 获取城市数据
    getCityData (parentId) {
      return new Promise((resolve, reject) => {
        city({ parentId: parentId }).then(res => {
          console.log(res)
          this.cityData = res.data.data
          resolve(1)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 点击选择城市
    choseCity (city, idx) {
      console.log(city)
      const cityId = city.id
      this.tabData.cityTab = { ...city, active: false }
      this.getAreaData(cityId).then(res => {
        this.provinceShow = false
        this.cityShow = false
        this.areaShow = true
        this.tabData.areaTab.active = false
        this.tabData.areaTab.name = ''
        this.tabData.areaTab.id = ''
        this.tabData.choseTab.active = true
        this.cityData = this.cityData.filter(function (item) {
          if (item.id === cityId) {
            item.active = true
          } else {
            item.active = false
          }
          return item
        })
      })
    },
    // 获取区县数据
    getAreaData (parentId) {
      return new Promise((resolve, reject) => {
        city({ parentId: parentId }).then(res => {
          console.log(res)
          this.areaData = res.data.data
          resolve(1)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 点击选择区县
    choseArea (area, idx) {
      const areaId = area.id
      console.log(areaId)
      this.areaData = this.areaData.filter(function (item) {
        if (item.id === areaId) {
          item.active = true
        } else {
          item.active = false
        }
        return item
      })
      this.tabData.areaTab = { ...area, active: true }
      console.log(this.tabData)
      this.choseAddressVisible = false
      this.addressText = `${this.tabData.provinceTab.name} ${this.tabData.cityTab.name} ${this.tabData.areaTab.name}`
    },
    // 设置默认
    changeAcquiesce (val) {
      console.log(this.form.acquiesce)
    },
    // 获取地址回显信息
    getDetailAddress () {
      const params = {
        addId: this.$route.query.id
      }
      detailAddress(params).then(res => {
        console.log(res)
        const resData = res.data.data
        this.form.name = resData.name
        this.form.phone = resData.phone
        this.addressText = `${resData.province} ${resData.city} ${resData.area}`
        this.form.address = resData.address
        this.form.acquiesce = resData.acquiesce === 2 ? 'true' : 'false'
        this.tabData.areaTab.id = resData.areaId
      })
    },
    // 删除地址
    delAddress () {
      const params = {
        addressId: this.$route.query.id
      }
      if (!this.delLoading) {
        this.delLoading = true
        delAddress(params).then(res => {
          this.delLoading = false
          this.$router.push('/addressManage')
        })
      }
    },
    // 保存
    save () {
      if (this.form.name === '') {
        this.$toast.show({
          text: '请输入收货人'
        })
        return
      }
      if (this.form.phone === '') {
        this.$toast.show({
          text: '请输入联系电话'
        })
        return
      }
      if (this.tabData.areaTab.id === '') {
        this.$toast.show({
          text: '请选择地区'
        })
        return
      }
      if (this.form.address === '') {
        this.$toast.show({
          text: '请输入详细地址'
        })
        return
      }
      const prarams = {
        ...this.form, acquiesce: this.form.acquiesce ? 2 : 1, areaId: this.tabData.areaTab.id, id: this.$route.query.id
      }
      if (!this.saveLoading) {
        this.saveLoading = true
        updateAddress(JSON.stringify(prarams)).then(res => {
          this.saveLoading = false
          this.$router.push('/addressManage')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addAddress {
  min-height: 100%;
  background: #fff;
}
.content {
  padding-top: 0.4rem;
}
.form-item {
}
.btn-box {
  margin: 4rem auto 0.8rem;
  display: flex;
  justify-content: space-around;
}
.add-btn {
  color: #fff;
  background: #0c3255;
  width: 2.666667rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 0.106667rem;
  //   margin: 4rem auto 0.8rem;
}
.del-btn {
  color: #333;
  background: #ebebeb;
  width: 2.666667rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 0.106667rem;
  //   margin: 4rem auto 0.8rem;
}
.address-popup {
  border-radius: 0.266667rem 0.266667rem 0 0;
  height: 80vh;
  width: 100%;
  background: #fff;
  .address-content {
    width: 100%;
    height: 100%;
    padding: 0.4rem;
    .tilte {
      position: relative;
      height: 0.533333rem;
      line-height: 0.533333rem;
      h4 {
        font-size: 0.426667rem;
      }
      .close {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.4rem;
        height: 0.4rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .tab {
      margin-top: 0.533333rem;
      font-size: 0.373333rem;
      .tab-item {
        position: relative;
        margin-right: 0.4rem;
      }
      .active {
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 0.053333rem;
          background: #0c3255;
          bottom: -0.133333rem;
          left: 0;
        }
      }
    }
    .province-content,
    .city-content,
    .area-content {
      margin-top: 0.4rem;
      height: 86%;
      //   background: pink;
      overflow: auto;
      .item {
        line-height: 0.8rem;
        position: relative;
        .choseIcon {
          display: inline-block;
          width: 0.266667rem;
          height: 0.266667rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .active {
        padding-left: 0.533333rem;
        &::before {
          content: "";
          position: absolute;
          width: 0.4rem;
          height: 0.4rem;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.black {
  color: #333;
}
</style>
