<template>
  <v-app>
    <router-view />

    <v-snackbar
      v-model="snackbar.show"
      :class="{ withBottomPlayer: snackbar.withBottomPlayer }"
      >{{ snackbar.message }}</v-snackbar
    >
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import RoadEvent from "./components/RoadEvent";

export default {
  name: "App",

  components: {
    // RoadEvent,
  },

  data: () => ({
    snackbar: {
      show: false,
      message: ``,
      timeout: null,
      withBottomPlayer: true,
    },
  }),
};
</script>
