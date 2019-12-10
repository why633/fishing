// 关闭AppWebview
import { appSource } from '@/utils/appSource'
export default function closeWebview () {
  console.log('closeWebview')
  if (appSource() === 'ios') {
    App.popBack('popBack') // eslint-disable-line
  }
  if (appSource() === 'andriod') {
    console.log('andriod')
    window.android.closePage()
  }
}
