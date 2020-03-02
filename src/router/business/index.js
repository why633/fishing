const business = [
  {
    path: '/business/activeList',
    name: 'activeList',
    component: () => import('@/views/business/activeList'),
    meta: {
      title: 'activeList'
    }
  },
  {
    path: '/business/draw',
    name: 'draw',
    component: () => import('@/views/business/subPage/draw'),
    meta: {
      title: 'draw'
    }
  },
  {
    path: '/business/activeDetails',
    name: 'activeDetails',
    component: () => import('@/views/business/subPage/activeDetails'),
    meta: {
      title: 'activeDetails'
    }
  },
  {
    path: '/business/collectFish',
    name: 'collectFish',
    component: () => import('@/views/business/subPage/collectFish'),
    meta: {
      title: 'collectFish'
    }
  },
  {
    path: '/business/colleagueAnalysis',
    name: 'colleagueAnalysis',
    component: () => import('@/views/business/colleagueAnalysis'),
    meta: {
      title: 'colleagueAnalysis'
    }
  }
]
export default business
