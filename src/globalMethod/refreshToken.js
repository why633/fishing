import { appSource } from '@/utils/appSource'

export default function refreshToken () {
  return new Promise((resolve, reject) => {
    if (appSource() === 'ios') {
      window['refreshToken'] = (result) => {
        resolve(appSource())
      }
    }
    if (appSource() === 'andriod') {
      window.android.refreshToken()
      resolve(appSource())
    }
  })
}
