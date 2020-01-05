<template>
  <div class="addressManage">
    <top-title :isBackPre="false" @backClick="closeWebview">收货地址管理</top-title>
    <mescroll-vue ref="mescroll" :down="{use: false}">
      <div class="content">
        <div class="address-list" v-if="addressData.length!=0">
          <div>
            <div class="address-item" v-for="(item, index) in addressData" :key="index">
              <div class="user-info">
                <span class="name text-overflow">{{item.name}}</span>
                <span class="phone">{{item.phone|encodePhone}}</span>
                <span class="default-address" v-if="item.acquiesce==2">默认</span>
              </div>
              <div class="address text-overflow">{{ item.address }}</div>
              <span class="edit" @click="goEditAddress(item.id)">
                <img :src="editIcon" alt />
              </span>
            </div>
          </div>
          <div class="add-btn" @click="goAddAddress">添加新地址</div>
        </div>
        <div class="noData" v-else>
          <div class="tips">您还没有添加地址~</div>
          <div class="addAddress">添加新地址</div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { getAddress } from '@/api'
export default {
  data () {
    return {
      editIcon: require('@/assets/edit.png'),
      addressData: []
    }
  },
  created () {
    this.getAddressData()
  },
  methods: {
    closeWebview () {
      this.$closeWebview()
    },
    // 跳转新增地址
    goAddAddress () {
      this.$router.push('/addressManage/addAddress')
    },
    // 跳转编辑地址
    goEditAddress (id) {
      this.$router.push('/addressManage/editAddress?id=' + id)
    },
    // 获取地址列表
    getAddressData () {
      getAddress().then(res => {
        this.addressData = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.addressManage {
  min-height: 100%;
  background: #fff;
}
.address-list {
  padding: 0.4rem;
  .address-item {
    position: relative;
    padding: 0.4rem 0;
    border-bottom: 1px solid #ebebeb;
    &:last-child {
      border-bottom: none;
    }
    .user-info {
      margin-bottom: 0.266667rem;
      width: 80%;
      .name {
        display: inline-block;
        // margin-right: 0.666667rem;
        width: 2.4rem;
      }
      .default-address {
        color: #fff;
        background: red;
        padding: 0.026667rem 0.106667rem;
        margin-left: 0.4rem;
      }
    }
    .address {
      width: 80%;
    }
    .edit {
      position: absolute;
      width: 0.666667rem;
      height: 0.666667rem;
      top: 50%;
      transform: translateY(-50%);
      right: 0.4rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.noData {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  .tips {
    text-align: center;
  }
  .addAddress {
    color: #fff;
    background: #0c3255;
    width: 2.666667rem;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    border-radius: 0.106667rem;
    margin: 0 auto;
    margin-top: 0.8rem;
  }
}
.add-btn {
  color: #fff;
  background: #0c3255;
  width: 2.666667rem;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  border-radius: 0.106667rem;
  margin: 0.8rem auto;
}
</style>
