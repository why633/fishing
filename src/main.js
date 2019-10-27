// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'
// Vuex
// import store from './store'
// 自定义插件
// import Plugin from './plugin'
import '@/plugin/flexible.js'
import '@/styles/normalize.css'
import '@/styles/index.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
