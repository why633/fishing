const agreement = [
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('@/views/agreement/agreement'),
    meta: {
      title: 'agreement'
    }
  },
  {
    path: '/cooperateAgreement',
    name: 'cooperateAgreement',
    component: () => import('@/views/agreement/cooperateAgreement'),
    meta: {
      title: 'cooperateAgreement'
    }
  }
]

export default agreement
