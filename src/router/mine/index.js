const mine = [
  {
    path: '/mine/follow',
    name: 'follow',
    component: () => import('@/views/mine/follow'),
    meta: {
      title: 'follow'
    }
  },
  {
    path: '/mine/fans',
    name: 'fans',
    component: () => import('@/views/mine/fans'),
    meta: {
      title: 'fans'
    }
  },
  {
    path: '/mine/publish',
    name: 'publish',
    component: () => import('@/views/mine/publish'),
    meta: {
      title: 'publish'
    }
  },
  {
    path: '/mine/billDetails',
    name: 'billDetails',
    component: () => import('@/views/mine/billDetails'),
    meta: {
      title: 'billDetails'
    }
  },
  {
    path: '/mine/signIn',
    name: 'signIn',
    component: () => import('@/views/mine/signIn'),
    meta: {
      title: 'signIn'
    }
  },
  {
    path: '/mine/hotLine',
    name: 'hotLine',
    component: () => import('@/views/mine/hotLine'),
    meta: {
      title: 'hotLine'
    }
  },
  {
    path: '/mine/collection',
    name: 'collection',
    component: () => import('@/views/mine/collection'),
    meta: {
      title: 'collection'
    }
  }
]

export default mine
