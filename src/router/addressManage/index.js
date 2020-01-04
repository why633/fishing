const addressManage = [
  {
    path: '/addressManage',
    name: 'addressManage',
    component: () => import('@/views/addressManage/addressManage'),
    meta: {
      title: 'addressManage'
    }
  },
  {
    path: '/addressManage/addAddress',
    name: 'addAddress',
    component: () => import('@/views/addressManage/subPage/addAddress'),
    meta: {
      title: 'addAddress'
    }
  }
]

export default addressManage
