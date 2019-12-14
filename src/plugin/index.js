// import * as directives from '@/directive'
import * as filters from '@/filters'
// import * as mixins from '@/mixins'
import * as components from '@/components'
import * as globalMethod from '@/globalMethod'

const Plugin = {}
Plugin.install = Vue => {
  // 遍历注入所有的directive
  // Object.keys(directives).forEach(key => {
  //   Vue.directive(key, directives[key])
  // })

  // 遍历注入所有的filter
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })

  // 遍历注入所有的 mixins
  // Object.keys(mixins).forEach(key => {
  //   Vue.mixin(mixins[key])
  // })
  // 遍历注入所有的组件
  Object.keys(components).forEach(key => {
    // Toast插件单独处理为全局
    if (key == 'Toast') {
      // 如果toast还在，则不再执行
      if (document.getElementsByClassName('alertBox').length) {
        return
      }
      let ToastTpl = Vue.extend(components[key]) // 创建vue构造器
      let $vm = new ToastTpl() // 实例化vue实例
      let tpl = $vm.$mount().$el
      document.body.appendChild(tpl)
      Vue.prototype.$toast = { // 在Vue的原型上添加实例方法，以全局调用
        show (options) { // 控制toast显示的方法
          if (typeof options === 'string') { // 对参数进行判断
            $vm.text = options // 传入props
          } else if (typeof options === 'object') {
            Object.assign($vm, options) // 合并参数与实例
          }
          $vm.show = true // 显示toast
          clearTimeout(timer)
          var timer = setTimeout(() => {
            $vm.show = false
          }, $vm.time)
        },
        hide () { // 控制toast隐藏的方法
          $vm.show = false
        }
      }
    } else {
      Vue.component(key, components[key])
    }
  })
  Object.keys(globalMethod).forEach(key => {
    Vue.prototype[`$${key}`] = globalMethod[key]
  })
}

export default Plugin
