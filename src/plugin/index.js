// import * as directives from '@/directive'
// import * as filters from '@/filters'
// import * as mixins from '@/mixins'
import * as components from '@/components'

const Plugin = {}
Plugin.install = Vue => {
  // 遍历注入所有的directive
  // Object.keys(directives).forEach(key => {
  //   Vue.directive(key, directives[key])
  // })

  // 遍历注入所有的filter
  // Object.keys(filters).forEach(key => {
  //   Vue.filter(key, filters[key])
  // })

  // 遍历注入所有的 mixins
  // Object.keys(mixins).forEach(key => {
  //   Vue.mixin(mixins[key])
  // })
  // 遍历注入所有的组件
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

export default Plugin
