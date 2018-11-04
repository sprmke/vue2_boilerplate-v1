<template>
  <div class="home">
    <div class="logo">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <app-welcome />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/home/Welcome.vue";

export default {
  name: "home",
  components: {
    'app-welcome': Welcome
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 2rem 0;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 120px;
    }
  }
}
</style>

