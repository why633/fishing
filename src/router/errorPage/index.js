const errorPage = [
  {
    path: '*',
    name: 'errorPage',
    component: () => import('@/views/errorPage/errorPage'),
    meta: {
      title: 'errorPage'
    }
  }
]
export default errorPage
