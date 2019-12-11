import RequestMethod from '@/utils/axios.js'

const { $get } = new RequestMethod()

/**
 * 获取消息
 * @param {} params
 */
export function getMessage (params) {
  return $get('/user/message/getUserMsg', params)
}

/**
 * 获取钓技课堂列表
 * @param {order:hot/time} params
 */
export function articleList (params) {
  return $get('/info/shortInfo/getNewHot', params)
}

/**
 * 获取文章详情
 * @param {infoId} params
 */
export function articleDetail (params) {
  return $get('/info/detailInfo/getById', params)
}

/**
 * 获取签到数据
 * @param {date:yyyy-MM} params
 */
export function checkSign (params) {
  return $get('/user/sign/checkSign', params)
}

/**
 * 当天签到
 */
export function signToday () {
  return $get('/user/sign/signToday')
}

/**
 * 获取账单明细
 */
export function billDetails (params) {
  return $get('/order/balance/transaction/flow', params)
}

/**
 * 获取渔获详情
 */
export function fishCatchDetails (params) {
  return $get('/info/detail/fishCatch', params)
}

/**
 * 获取赛事活动
 */
export function getEvent (params) {
  return $get('/spot/getEvent/byUserId', params)
}

/**
 * 获取可抽号赛事
 */
export function getDrawGame (params) {
  return $get('/event/searchEvent/whereLot', params)
}

/**
 * 获取摇号用户
 */
export function getDrawUser (params) {
  return $get('/event/getUser/whereLot', params)
}

/**
 * 手动摇号
 */
export function lotNumber (params) {
  return $get('/event/lotNumber/manual', params)
}

/**
 * 收藏的赛事/活动列表
 */
export function eventCollect (params) {
  return $get('/event/collect/listCollect', params)
}

/**
 * 收藏的钓场列表
 */
export function spotCollect (params) {
  return $get('/spot/collect/listByUser', params)
}
