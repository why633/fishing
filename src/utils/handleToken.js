/*
 * @Description: handle token
 * @Author: why
 * @Date: 2019-10-17 17:33:49
 * @LastEditTime: 2019-10-17 17:38:20
 * @LastEditors: Please set LastEditors
 */
export default class HandelToken {
  constructor () {
    this.TokenKey = 'Auth-Token'
    this.storage = window.localStorage
  }
  getToken () {
    return this.storage.getItem(this.TokenKey)
  }
  setToken (token) {
    return this.storage.setItem(this.TokenKey, token)
  }
  removeToken () {
    return this.storage.removeItem(this.TokenKey)
  }
}
