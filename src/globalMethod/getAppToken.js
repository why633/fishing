// 从app获取token
import { appSource } from '@/utils/appSource'
import HandleToken from '@/utils/handleToken'
const handleToken = new HandleToken()

export default function getAppToken () {
  return new Promise((resolve, reject) => {
    if (appSource() === 'ios') {
      window['getToken'] = (result) => {
        console.log('H5获取的token:' + result)
        handleToken.setToken(result)
        resolve(appSource())
      }
    }
    if (appSource() === 'andriod') {
      // alert(window.android.getToken())
      handleToken.setToken(window.android.getToken())
      resolve(appSource())
    }
  })
}
