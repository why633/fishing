const message = [
  {
    path: '/message',
    name: 'message',
    component: () => import('@/views/message/message'),
    meta: {
      title: 'message'
    }
  },
  {
    path: '/message/followMessage',
    name: 'followMessage',
    component: () => import('@/views/message/subPage/followMessage'),
    meta: {
      title: 'followMessage'
    }
  }
]

export default message
