const userInfo = [
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/userInfo/userInfo'),
    meta: {
      title: 'userInfo'
    }
  },
  {
    path: '/userInfo/article',
    name: 'article',
    component: () => import('@/views/userInfo/subPage/article'),
    meta: {
      title: 'article'
    }
  }
]

export default userInfo
