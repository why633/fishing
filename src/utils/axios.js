/*
 * @Description: axios request
 * @Author: why
 * @Date: 2019-10-17 17:22:11
 * @LastEditTime: 2019-10-18 11:22:38
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import axios from 'axios'
import HandleToken from '@/utils/handleToken'
const handleToken = new HandleToken()
/**
 * 处理请求头数据和处理结果
 */
class HandleParamAndResult {
  constructor() {
    var DEV_HOST = 'http://47.92.169.47:9000/fishing' // 测试接口地址
    // var DEV_HOST = 'https://fish.diaoyuphb.com/fishing' // 正式接口地址
    this.api = DEV_HOST
    // this.apiVersion = '2.1.0'
  }

  // 添加请求头
  _addHeaders () {
    // 自定义headers
    const headers = {
      'Content-Type': 'application/json',
      // 'authorization': "",
      // 'osType': 'H5',
      // 'Accept': `application/json; version=${this.apiVersion}`
    }
    // 动态添加token
    // 这个是我从APP的url拿到的token
    // headers.token = 'tvvJe7HNEp_27IZoHUcUIJlgoMBRjAwP' // 测试token
    headers.token = ''
    if (handleToken.getToken()) {
      headers.token = `${handleToken.getToken()}`
    }
    return headers
  }
  // 处理请求
  dealAxios (url, options) {
    // console.log(this._addHeaders())
    const _this = this
    options.headers = this._addHeaders()
    // do something before request
    return new Promise((resolve, reject) => {
      axios(this.api + url, options).then(res => {
        // do something after success
        console.log(res.data.code)
        if (res.data.code == 200) {
          resolve(res)
        } else {
          // 判断token失效 处理
          if (res.data.code == 4001) {
            // _this.$refreshToken()
            Vue.prototype.$toast.show({
              text: 'token失效请重新登录'
            })
          } else {
            Vue.prototype.$toast.show({
              text: res.data.message
            })
          }
          reject(res.data.message)
        }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }
}
/**
 * 封装请求方法
 * @param { Number | String } 平台传递的版本号
 */
class RequestMethod {
  constructor() {
    this.$get = this.$get.bind(this)
    this.$post = this.$post.bind(this)
    this.$put = this.$put.bind(this)
    this.$delete = this.$delete.bind(this)
    this.$upload = this.$upload.bind(this)
    this._method = this._method.bind(this)
  }

  /**
   * 整合请求方法
   * @param { String } url 接口路由
   * @param { Object } axios配置 请求参数
   */
  _method (url, options) {
    return new HandleParamAndResult().dealAxios(url, options)
  }

  /**
   * get方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   */
  $get (url, data) {
    return this._method(url, {
      params: data,
      method: 'get'
    })
  }

  /**
   * post方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   */
  $post (url, data) {
    return this._method(url, {
      data: data,
      method: 'post',
      type: 'json'
    })
  }

  /**
   * put方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   */
  $put (url, data) {
    return this._method(url, {
      data: data,
      method: 'put',
      type: 'json'
    })
  }

  /**
   * delete方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   */
  $delete (url, data) {
    return this._method(url, {
      params: data,
      method: 'delete'
    })
  }

  /**
   * 上传方法
   * @param { String } url 接口路由
   * @param { Object } data 请求参数
   */
  $upload (url, data) {
    return this._method(url, {
      body: data,
      method: 'post',
      type: 'formData'
    })
  }
}
export default RequestMethod
