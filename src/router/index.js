import Vue from 'vue'
import Router from 'vue-router'
import routes from './base/'
import store from '@/store'
Vue.use(Router)

var router = new Router({
  // router采用history的模式
  mode: 'history',
  // scrollBehavior: () => ({ y: 0 }),
  routes: routes,
  // 设置滚动位置
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
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

// 判断处理页面位置缓存
router.beforeEach((to, from, next) => {
  console.log(from.name, to.name)
  if (from.name === 'fishingClassroom' && to.name === 'classDetails') {
    to.meta.keepAlive = false
  }
  if (from.name === 'articleDetails' && to.name === 'classDetails') {
    to.meta.keepAlive = false
  }
  if (from.name === 'articleDetails' && to.name === 'fishingClassroom') {
    to.meta.keepAlive = true
  }
  next()
})

export default router
