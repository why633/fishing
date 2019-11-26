// 判断设备是ios还是安卓
export default function judgeDevice () {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    return 'android'
  }
  if (isiOS) {
    return 'ios'
  }
  return 'not android and ios'
}
