import Vue from "vue";
import Vuex from "vuex";

import axiosAuth from './axios-auth';
import globalAxios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser (state, userData) {
      console.log('authUser', userData);
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    }
  },
  actions: {
    register ({commit, dispatch}, authData) {
      axiosAuth.post('/signupNewUser?key=AIzaSyD7eKY8xqMNl-HC3GyO8MbyHUCMrybzPLs', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('storeUser', authData)
        })
        .catch(err => console.log(err))
    },
    storeUser ({commit, state}, userData) {
      if (!state.idToken) {
        return
      }
      globalAxios.post('/users.json' + '?auth=' + state.idToken, userData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    },
    login ({commit}, authData) {
      axiosAuth.post('/verifyPassword?key=AIzaSyD7eKY8xqMNl-HC3GyO8MbyHUCMrybzPLs', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
        })
        .catch(err => console.log(err))
    },
    fetchUser ({commit, state}) {
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          console.log(res)
          // get all users
          const data = res.data
          const users = []
          for (let key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          console.log(users)
          // set first user as authenticated user
          commit('storeUser', users[0])
        })
        .catch(err => console.log(err))
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
});
