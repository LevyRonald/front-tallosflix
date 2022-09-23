import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http/index.js'
Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    token: null,
    user: {}
  },
  getters: {
  },
  mutations: {
    DEFINIR_USUARIO_LOGADO(state, { token, user }) {
      state.token = token
      state.user = user
      localStorage.setItem("token", token)
    }
  },
  actions: {
    efetuarLogin({ commit }, user) {
      return new Promise((resolve, reject) => {
        http.post('/login', user)
          .then(response => {
            commit('DEFINIR_USUARIO_LOGADO', {
              token: response.data.access_token,
              user: response.data.user
            })
            resolve(response.data)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getUsers() {
      return new Promise((resolve, reject) => {
        http.get(`/users/list`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  },
  modules: {
  }
})
