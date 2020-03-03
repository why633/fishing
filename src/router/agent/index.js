const agent = [
  {
    path: '/agent/dataSummary',
    name: 'dataSummary',
    component: () => import('@/views/agent/dataSummary'),
    meta: {
      title: 'dataSummary'
    }
  },
  {
    path: '/agent/spotData',
    name: 'spotData',
    component: () => import('@/views/agent/spotData'),
    meta: {
      title: 'spotData'
    }
  }
]

export default agent
