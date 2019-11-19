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
export function getClassroomArticleList (params) {
  return $get('/info/shortInfo/getNewHot', params)
}
