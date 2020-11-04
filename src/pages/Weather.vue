<template>
  <v-container>
    <v-row class="justify-center" dense>
      <h3>這一頁會有看天氣的功能，只是還沒做。</h3>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Weather",
  data: () => ({}),
  methods: {
    checkLocalStorage: function() {
      console.log("checking");
    },
  },
  beforeCreate: function() {
    console.log("fucking");
    this.checkLocalStorage;
  },
};
</script>
