<template>
  <div class="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-if="email">Your email address: {{ email }}</p>
  </div>
</template>

<script>
  export default {
    name: "dashboard",
    computed: {
      email () {
        return !this.$store.getters.user ? false : this.$store.getters.user.email
      }
    },
    created() {
      this.$store.dispatch('fetchUser')
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    h1, p {
      text-align: center;
    }
    p {
      color: #f81f1f;
    }
      
  }
</style>