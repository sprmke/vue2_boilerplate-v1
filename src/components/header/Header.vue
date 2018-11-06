<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">VueJS 2 Boilerplate</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="auth">
          <button @click="onLogout" class="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      onLogout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color:#41b883;
    padding: 0 20px;

    .logo {
      font-weight: bold;
      color: white;

       a {
        text-decoration: none;
        color: white;
      }
    }
    nav {
      height: 100%;

      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        height: 100%;
        display: flex;
        flex-flow: row;
        align-items: center;

        li {
          margin: 0 16px;

          a {
            text-decoration: none;
            color: white;

            &:hover,
            &:active,
            &.router-link-active {
              color: #dcf7e5;
            }
          }
          button {
            color: #fff;
            cursor: pointer;
            outline: none;
            border: 1px solid #fff;
            border-radius: 4px;
            background: transparent;
            padding: 0.5rem 1.25rem;
            transition: opacity 0.15s ease-in-out;

            &:hover {
              opacity: 0.9;
            }
          }
        }
      }
    }
  }
</style>