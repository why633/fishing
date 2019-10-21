import HandleToken from '@/utils/handleToken'
import { setStorage, getStorage } from '@/utils/handleStorage'
const handleToken = new HandleToken()

const user = {
  state: {
    token: '',
    userInfo: getStorage('userInfo') || {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      handleToken.setToken(token)
    }
  }
}

export default user
