const agentCollectFish = [
  {
    path: '/agentCollectFish/activeList',
    name: 'fishmongerActiveList',
    component: () => import('@/views/agentCollectFish/activeList'),
    meta: {
      title: 'fishmongerActiveList'
    }
  },
  {
    path: '/agentCollectFish/activeDetails',
    name: 'fishmongerActiveDetails',
    component: () => import('@/views/agentCollectFish/subPage/activeDetails'),
    meta: {
      title: 'fishmongerActiveDetails'
    }
  },
  {
    path: '/agentCollectFish/collectFish',
    name: 'fishmongerCollectFish',
    component: () => import('@/views/agentCollectFish/subPage/collectFish'),
    meta: {
      title: 'fishmongerCollectFish'
    }
  }
]
export default agentCollectFish
