<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-img max-width="100%" :src="currentLiveCamSource"></v-img>
      </v-col>

      <v-col cols="12" sm="6">
        <v-divider></v-divider>
        <v-list>
          <v-list-item-group v-model="selectedItem" color="primary" nav>
            <v-list-item v-for="(item, i) in liveCamSource" :key="i" @click="setLiveCamToImg(item.url)">
              <v-list-item-content>
                <v-list-item-title v-text="item.camName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {getDynamicLiveCamSourceJson} from "@/service/LiveCamService";

export default {
  name: "LiveCam",
  data: () => ({
    selectedItem: -1,
    currentLiveCamSource: "https://i.imgur.com/pmU8frC.png",
    liveCamSource: [],
  }),
  methods: {
    setLiveCamToImg(src) {
      this.currentLiveCamSource = src
    }
  },
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
  mounted() {
    this.liveCamSource = getDynamicLiveCamSourceJson();
  }
};
</script>
