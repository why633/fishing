// 从app获取token
import { appSource } from '@/utils/appSource'
import HandleToken from '@/utils/handleToken'
const handleToken = new HandleToken()

export default function getAppToken () {
  if (appSource() === 'ios') {
    window['getToken'] = (result) => {
      alert(result)
      handleToken.setToken(result)
    }
  }
  if (appSource() === 'andriod') {
    // alert(window.android.getToken())
    handleToken.setToken(window.android.getToken())
  }
}
