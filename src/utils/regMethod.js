/**
 * 判断是否为数字
 */
export default function isNum (num) {
  const reg = /^\d+(?=\.{0,1}\d+$|$)/
  if(reg.test(num)) {
    return true
  } else {
    return false
  }
}
