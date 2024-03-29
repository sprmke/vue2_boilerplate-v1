import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from './store';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import("./views/Login.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => {
        return import("./views/Dashboard.vue")
      },
      beforeEnter (to, from, next) {
        if (store.state.idToken) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
});
