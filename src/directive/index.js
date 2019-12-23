export async function imgplaceholder (el, binding) {
  let imgURL = binding.value // 获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL)
    if (exist) {
      el.setAttribute('src', imgURL)
    }
  }
}
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    let img = new Image()
    img.onload = function () {
      if (this.complete === true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function () {
      resolve(false)
      img = null
    }
    img.src = url
  })
}
