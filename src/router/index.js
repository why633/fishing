import Vue from 'vue'
import Router from 'vue-router'
import routes from './base/'
import store from '@/store'
// import { setStorage } from '@/utils/handleStorage'
Vue.use(Router)

var router = new Router({
  // router采用history的模式
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: routes
})

router.beforeEach((to, from, next) => {
  if (to.query.token) {
    store.commit('SET_TOKEN', to.query.token)
  }
  next()
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
