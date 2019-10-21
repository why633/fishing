import RequestMethod from '@/utils/axios.js'

const { $get } = new RequestMethod()

export function test () {
  return $get()
}
