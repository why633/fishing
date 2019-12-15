const fishingClassroom = [
  {
    path: '/teach',
    name: 'fishingClassroom',
    component: () => import('@/views/fishingClassroom/fishingClassroom'),
    meta: {
      title: 'fishingClassroom',
      keepAlive: true
    }
  },
  {
    path: '/fishingClassroom/classDetails',
    name: 'classDetails',
    component: () => import('@/views/fishingClassroom/subPage/classDetails'),
    meta: {
      title: 'classDetails',
      keepAlive: false
    }
  },
  {
    path: '/fishingClassroom/articleDetails',
    name: 'articleDetails',
    component: () => import('@/views/fishingClassroom/subPage/articleDetails'),
    meta: {
      title: 'articleDetails',
      keepAlive: false
    }
  }
]

export default fishingClassroom
