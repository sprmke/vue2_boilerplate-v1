import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';

Vue.config.productionTip = false;

// ===============================================================================
//--- Global Axios setup
// https://github.com/axios/axios

//-- Config Defaults
axios.defaults.baseURL = 'https://sprmke-vue-boilerplate.firebaseio.com';
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers.get['Accept'] = 'application/json';

//-- Interceptors
// Request interceptor
const reqInterceptor = axios.interceptors.request.use(config => {
  // Do something before request is sent
  console.log('Request interceptor', config)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Response interceptor
const resInterceptor = axios.interceptors.response.use(response =>  {
  // Do something with response data
  console.log('Response interceptor', response)
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

// Remove interceptors
axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);
// ===============================================================================

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
