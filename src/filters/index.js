import { formateDate } from '@/utils/formateDate'

/**
 * 计算钓技课堂标题
 */
export function classTitle (id) {
  const idMap = {
    '1': '黑坑',
    '2': '野钓',
    '3': '装备',
    '4': '路亚',
    '5': '海钓',
    '6': '杂谈'
  }
  return (idMap[id] ? idMap[id] : '')
}

/**
 * 格式化时间
 */

export function formateDateTime (date) {
  const parmas = {
    dateObj: date,
    fmt: 'yyyy-MM-dd hh:mm:ss'
  }
  if (date) {
    return formateDate(parmas)
  } else {
    return '--'
  }
}
