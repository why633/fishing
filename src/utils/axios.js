/*
 * @Description: axios request
 * @Author: why
 * @Date: 2019-10-17 17:22:11
 * @LastEditTime: 2019-10-18 11:22:38
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'
import HandleToken from '@/utils/handleToken'
const handleToken = new HandleToken()

/**
 * 处理请求头数据和处理结果
 */
class HandleParamAndResult {
  constructor () {
    var DEV_HOST = 'http://fishing.com'
    this.api = DEV_HOST
  }

  // 添加请求头
  _addHeaders () {
    // 自定义headers
    const headers = {
      'Content-Type': 'application/json',
      // 'authorization': "",
      'osType': 'H5'
    }
    // 动态添加token
    // alert(handleToken.getToken())
    // 这个是我从APP的url拿到的token
    // headers.Authorization = 'Bearer 61528CE7BD820BAB6550EF15C2EC0F27947706A01CE4062C7C0C603F8917A272A8B5357212141653B1257F5F3E83B86FA2FE4A0150608419E83E65F7C2340EC7AC0A3693ABF71F69F66AED511F43B790CB2BCC771A121B3BD4D76F0DFE30121AFA29C3A7D216923514C07397A00AD6F4DB786174D33D70277E8EBF1E0F123886'
    if (handleToken.getToken()) {
      headers.Authorization = `Bearer ${handleToken.getToken()}`
    }
    return headers
  }
  // 处理请求
  dealAxios (url, options) {
    // console.log(this._addHeaders())
    // const _this = this
    options.headers = this._addHeaders()
    // alert(JSON.stringify(options.headers))
    // do something before request
    return new Promise((resolve, reject) => {
      axios(this.api + url, options).then(res => {
        // do something after success
        resolve(res)
      }).catch(error => {
        console.log(error)
        // 判断token失效 处理
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
  constructor () {
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
