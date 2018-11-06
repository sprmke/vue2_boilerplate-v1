<template>
  <div class="welcome">
    <h1>VueJS 2 Boilerplate</h1>
    <p>A boilterplate that lets you get started on developing your VueJS apps. It includes vuex, axios connected to firebase, forms and validation, authentication and route guards, etc.</p>
    <div v-if="!auth" class="cta">
      <router-link class="signup" to="/register">Register</router-link>
      <router-link class="signin" to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>

<style lang="scss" scoped>
  .welcome {
    width: 80%;
    margin: auto;

    h1 {
      text-align: center;
    }
    p {
      text-align: center;
      width: 70%;
      margin: 0 auto 2rem auto;
    }
    .cta {
      width: 300px;
      margin: auto;
      text-align: center;

      a {
        margin: 0.4rem;
        text-decoration: none;
        display: inline-block;
        border: 1px solid #41b883;
        border-radius: 3px;
        width: 100px;
        padding: 10px;
        box-sizing: border-box;
        color: #41b883;
        transition: all 0.1s ease-in-out;

        &:hover,
        &:active {
          background-color: #41b883;
          color: white;
        }
        &.signup {
          background-color: #41b883;
          color: #fff;
        }
      }
    }
  }
</style>