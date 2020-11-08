<template>
  <v-container>
    <v-row class="justify-center" dense>
      <h3>這一頁會有看監視器的功能，只是還沒做。</h3>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LiveCam",
  data: () => ({}),
  methods: {},
  beforeCreate() {
    if (localStorage.getItem("RoadCode") == null) {
      console.log("You fucking donkey!");
      this.$router.push("roadselect");
      console.log(
        "%c ",
        "font-size:800px; background:url(https://i.pinimg.com/originals/ad/fa/0c/adfa0c865a9312afea03150e1fb1cfbd.gif) no-repeat;"
      );
    }
  },
};
</script>
