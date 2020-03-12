const rewardScore = [
  {
    path: '/rewardScore/score',
    name: 'score',
    component: () => import('@/views/rewardScore/score'),
    meta: {
      title: 'score'
    }
  },
  {
    path: '/rewardScore/scoreLog',
    name: 'scoreLog',
    component: () => import('@/views/rewardScore/scoreLog'),
    meta: {
      title: 'scoreLog'
    }
  },
  {
    path: '/rewardScore/scoreRule',
    name: 'scoreRule',
    component: () => import('@/views/rewardScore/scoreRule'),
    meta: {
      title: 'scoreRule'
    }
  }
]

export default rewardScore
