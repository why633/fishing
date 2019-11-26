// 设备输入法弹起收起布局处理
import judgeDevice from '@/utils/judgeDevice'
export default function keyboardHandle () {
  let scrollTop = 0
  if (judgeDevice() == 'ios') {
    document.body.addEventListener('focusin', () => {
      // 软键盘弹出的事件处理
      console.log('focusin')
      scrollTop = document.documentElement.scrollTop
    })
    document.body.addEventListener('focusout', () => {
      // 软键盘收起的事件处理
      document.documentElement.scrollTop = scrollTop
    })
  }
  if (judgeDevice() == 'android') {
    // 获取原窗口的高度
    const originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.οnresize = function () {
      // 键盘弹起与隐藏都会引起窗口的高度发生变化
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (resizeHeight - 0 < originalHeight - 0) {
        // 当软键盘弹起，在此处操作
        console.log('键盘弹起')
        const inputEl = document.querySelector('.input-content')
        console.log(inputEl)
        const editable = inputEl.getAttribute('contenteditable')
        if (inputEl.tagName == 'INPUT' || inputEl.tagName == 'TEXTAREA' || editable === '' || editable) {
          setTimeout(function () {
            inputEl.scrollIntoView()
          }, 300)
        }
      } else {
        // 当软键盘收起，在此处操作
        console.log('键盘收起')
      }
    }
  }
}