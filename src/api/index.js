import RequestMethod from '@/utils/axios.js'

const { $get, $post } = new RequestMethod()

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
 * 评论渔获详情
 */
export function remarkFishCatch (params) {
  return $post('/info/comment/fishCatch', params)
}

/**
 * 评论渔获详情
 */
export function likeFishCatch (params) {
  return $get('/info/like/fishCatch', params)
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
 * 获取报名用户
 */
export function enrollUser (params) {
  return $get('/event/getUser/enroll', params)
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

/**
 * 收藏的钓场列表
 */
export function goodCollect (params) {
  return $get('/user/userInfo/listCollect', params)
}

/**
 * 获取小程序摇号页面二维码
 */
export function getQr (params) {
  return $get('/event/lotNumber/getqrcode', params)
}

/**
 * 删除活动
 */
export function delEvent (params) {
  return $get('/event/delEvent/byId', params)
}

/**
 * 获取省份
 */
export function province () {
  return $get('/user/select/province')
}

/**
 * 获取城市
 */
export function city (params) {
  return $get('/user/select/city', params)
}

/**
 * 获取地址列表
 */
export function getAddress () {
  return $get('/goods/exchange/getAddress')
}

/**
 * 新增地址
 */
export function addAddress (params) {
  return $post('/goods/exchange/addAddress', params)
}
/**
 * 新增地址
 */
export function updateAddress (params) {
  return $post('/goods/exchange/updateAddress', params)
}

/**
 * 编辑地址回显
 */
export function detailAddress (params) {
  return $get('/goods/exchange/detailAddress', params)
}

/**
 * 删除地址
 */
export function delAddress (params) {
  return $get('/goods/exchange/delAddress', params)
}

/**
 * 积分历史
 */
export function currencyHistory (params) {
  return $get('/event/currency/history', params)
}

/**
 * 一键收鱼
 */
export function harvesting (params) {
  return $post('/order/application/fish/harvesting', params)
}

/**
 * 退报名押金
 */
export function refundPrepay (params) {
  return $get('/order/application/refund/prepay', params)
}

/**
 * 获取同行数据
 */
export function spotAnalyse (params) {
  return $get('/spot/analyse/spot', params)
}

/**
 * 代理人获取钓场数据
 */
export function getTask (params) {
  return $get('/spot/task/by/user/id', params)
}
