<template>
  <v-app>
    <div>
      <v-app-bar class="mb-2" color="white">
        <v-app-bar-nav-icon @click="backToHome"><v-icon>mdi-arrow-left</v-icon></v-app-bar-nav-icon>
        <v-toolbar-title>帳號</v-toolbar-title>
      </v-app-bar>

      <v-main>
        <router-view/>
      </v-main>
    </div>
  </v-app>
</template>
<script>

export default {
  name: "Empty",
  methods: {
    backToHome() {
      this.$router.push("/");
    },
  }
};
</script>