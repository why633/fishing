// 向app传地址
import { appSource } from '@/utils/appSource'
export default function sendAddress (id, address) {
  if (appSource() === 'ios') {
    App.selectAddressDetail(id, address) // eslint-disable-line
  }
  if (appSource() === 'andriod') {
    console.log('andriod')
    window.android.selectAddressDetail(id, address)
  }
}
