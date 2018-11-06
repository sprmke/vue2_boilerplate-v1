import Vue from "vue";
import Vuex from "vuex";

import axiosAuth from './axios-auth';
import globalAxios from 'axios';

import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    storeUser (state, user) {
      state.user = user
    },
    storeAuthData (state, userData) {
      console.log('storeAuthData', userData);
      state.idToken = userData.token
      state.userId = userData.userId
    },
    clearAuthData (state) {
      console.log('clearAuthData')
      state.idToken = null
      state.userId = null
    },
    saveLocalAuthData (state, resData) {
      const now = new Date()
      const expirationDate = new Date(now.getTime() + (resData.expiresIn * 1000))
      localStorage.setItem('token', resData.idToken)
      localStorage.setItem('userId', resData.localId)
      localStorage.setItem('expirationDate', expirationDate)
    },
    removeLocalAuthData () {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationDate')
    }
  },
  actions: {
    autoLogin ({commit}) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('storeAuthData', {
        token,
        userId
      })
      router.push('/dashboard')
    },
    setLogoutTimer ({dispatch}, expirationDate) {
      setTimeout(() => {
        dispatch('logout')
      }, expirationDate * 1000)
    },
    register ({commit, dispatch}, authData) {
      axiosAuth.post('/signupNewUser?key=AIzaSyD7eKY8xqMNl-HC3GyO8MbyHUCMrybzPLs', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          // store user auth data to state
          commit('storeAuthData', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          // save user auth data to local storage
          commit('saveLocalAuthData', res.data)
          // store register form data to state (user)
          dispatch('storeUser', authData)
          // starts auto logout timer
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.push('/dashboard')
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
    login ({commit, dispatch}, authData) {
      axiosAuth.post('/verifyPassword?key=AIzaSyD7eKY8xqMNl-HC3GyO8MbyHUCMrybzPLs', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          console.log(res)
          // store user auth data to state
          commit('storeAuthData', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          // save user auth data to local storage
          commit('saveLocalAuthData', res.data)
          // starts auto logout timer
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.push('/dashboard')
        })
        .catch(err => console.log(err))
    },
    logout ({commit}) {
      commit('clearAuthData')
      commit('removeLocalAuthData')
      router.replace('/login')
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
    },
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
});
