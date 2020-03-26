// 关闭AppWebview
import { appSource } from '@/utils/appSource'
export default function appToH5 (url) {
  if (appSource() === 'ios') {
    App.pushNextH5(url) // eslint-disable-line
  }
  if (appSource() === 'andriod') {
    console.log('andriod')
    window.android.goToH5(url)
  }
}
