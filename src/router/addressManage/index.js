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
  },
  {
    path: '/addressManage/editAddress',
    name: 'editAddress',
    component: () => import('@/views/addressManage/subPage/editAddress'),
    meta: {
      title: 'editAddress'
    }
  }
]

export default addressManage
