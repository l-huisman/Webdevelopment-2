<script>
import Navigation from './components/Navigation.vue'

export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<template>
  <navigation />
  <!-- Add a router view -->
  <router-view />
</template> 

<style scoped>
</style>
