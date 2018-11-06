<template>
  <div id="app">
    <app-header/>
    <router-view/>
  </div>
</template>

<script>
  import Header from '@/components/header/Header.vue';

  export default {
    components: {
      'app-header': Header
    },
    created() {
      this.$store.dispatch('autoLogin')
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body {
  margin: 0;
}
#app {
  font-family: "Source Sans Pro", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
