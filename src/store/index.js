import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

// const store = new Vuex.Store({
//     modules: {
//         user
//     },
//     getters
// })

// export default store

// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

const state = {
  pageYOffset: 0,
  modules: {
    user
  },
  getters
}

const mutations = {
  setPageYOffset (state, val) {
    state.pageYOffset = val
  }
}

export default new Vuex.Store({
  ...state, mutations
})
