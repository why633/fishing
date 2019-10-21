const test = [
  {
    path: '/personalList',
    name: 'personalList',
    component: () => import('@/views/personal/personalList'), // 我的-我的订单列表
    meta: {
      title: '我的订单列表'
    }
  }
]

export default test
