import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import http from '../http/index.js';

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    token: null,
    user: {},
  },
  getters: {
  },
  mutations: {
    DEFINIR_USUARIO_LOGADO(state, { token, user }) {
      state.token = token
      state.user = user
    },
    DESLOGAR_USUARIO(state) {
      state.token = null
      state.user = {}
      localStorage.clear()
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
    },
    createUsers(ctx, user){
      return new Promise((resolve, reject) => {
        http.post(`/users/create`, user)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    deleteUser(usuarioGetDel) {
      return new Promise((resolve, reject) => {
        http.delete(`/users/delete/${usuarioGetDel._id}`)
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    },
    updateUser(user) {
      return new Promise((resolve, reject) => {
        http.patch(`/users/update/${user._id}`, {user})
        .then(response => resolve(response))
        .catch(error => reject(error))
      })
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
