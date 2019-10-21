import RequestMethod from '@/utils/axios.js'

const { $get } = new RequestMethod()

export function test (params) {
  return $get('/scf/loan/carApply/carApplyDetails', params)
}
