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
    path: '/message/messageList',
    name: 'messageList',
    component: () => import('@/views/message/subPage/messageList'),
    meta: {
      title: 'messageList'
    }
  }
]

export default message
