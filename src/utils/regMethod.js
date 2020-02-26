/**
 * 判断是否为数字
 */
export function isNum (num) {
  const reg = /^\d+(?=\.{0,1}\d+$|$)/
  if(reg.test(num)) {
    return true
  } else {
    return false
  }
}

/**
 * 保留两位小数
 */
export function twoFloat (num) {
  const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
  if(reg.test(num)) {
    return true
  } else {
    return false
  }
}


