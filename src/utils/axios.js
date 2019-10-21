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
    var DEV_HOST = '//mwapi.emao.com'
    this.api = DEV_HOST
    this.apiVersion = '2.1.0'
  }

  // 添加请求头
  _addHeaders () {
    // 自定义headers
    const headers = {
      'Content-Type': 'application/json',
      // 'authorization': "",
      // 'osType': 'H5',
      'Accept': `application/json; version=${this.apiVersion}`
    }
    // 动态添加token
    // alert(handleToken.getToken())
    // 这个是我从APP的url拿到的token
    headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBZG1pbk5vcm1hbEFjY291bnQiLCJzdWIiOiI0MDAwMDAiLCJpYXQiOjE1NzE2MjczNjUsImV4cCI6MTU3MTcxMzc2NSwiZGF0YSI6eyJ1c2VySWQiOiI0MDAwMDAiLCJ1c2VyTmFtZSI6Ilx1N2NmYlx1N2VkZlx1N2JhMVx1NzQwNlx1NTQ1OCIsInVzZXJQYXNzd29yZCI6IjUzNTM4MWVjOWQ1YWI3YTM5MGRiMGEzMDg2MDYwMGYyIiwidXNlclBob25lIjoiMTM5MTIzNDU2NzgiLCJ1c2VyRW1haWwiOiJ6aGFuZ3l1bjEzNDZAZW1hby5jb20iLCJ1c2VyRGVwYXJJZCI6IjEwMCIsInVzZXJHcm91cElkIjoiMCIsInVzZXJSb2xlSWQiOiIzMDAwMCIsInVzZXJPcGVyYXRpb24iOiIzIiwic3RhdHVzIjoiMSIsImNyZWF0ZWRBdCI6IjIwMTgtMTEtMjkgMTk6MjM6MjMiLCJ1cGRhdGVkQXQiOiIyMDE5LTAyLTE0IDE2OjQzOjI2IiwiZGVsZXRlZEF0IjpudWxsLCJvcGVyYXRvck5hbWUiOiJhZG1pbiIsInBlcm1pc3Npb24iOltdLCJsb2dpbkRhdGUiOjE1NzE2MjczNjV9fQ.bX-vXHSj7ZDEuHLEEukFqBEmChWbk0h8fpiQsSI4Lto'
    // if (handleToken.getToken()) {
    //   headers.Authorization = `Bearer ${handleToken.getToken()}`
    // }
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
