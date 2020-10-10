<template>
  <v-app>
    <Navbar />
    <v-main class="grey lighten-5">
      <router-view class="mx-4"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/core/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
* {
  font-family: "Montserrat", "Roboto", sans-serif !important;
}

main {
  padding: 0 !important;
}
</style>