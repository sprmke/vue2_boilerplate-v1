<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">VueJS 2 Boilerplate</router-link>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

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
        }
      }
    }
  }
</style>