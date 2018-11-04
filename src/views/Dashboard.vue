<template>
  <div class="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p v-cloak>Your email address: {{ email }}</p>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "dashboard",
    data() {
      return {
        email: ''
      }
    },
    created() {
      axios.get('/users.json')
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
          // set first user email as default email
          this.email = users[0].email
        })
        .catch(err => console.log(err))
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