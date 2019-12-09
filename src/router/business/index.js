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
  }
]
export default business
