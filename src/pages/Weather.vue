<template>
  <v-container>
    <v-row dense>
      <!-- <v-col cols="12" v-for="(weatherInfo, i) in weatherInfo" :key="i"> -->
      <v-col cols="12">
        <v-card elevation="2" class="mx-auto" max-width="480">
          <v-row>
            <v-col cols="3">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    地點
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    C0R150
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="2"> </v-col>
            <v-col cols="3">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    21
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    目前溫度
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="4">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    -998.00
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    10 分鐘雨量
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { weatherApi } from "@/service/WeatherApiService";

export default {
  name: "Weather",
  data: () => ({
    weatherInfo: [],
  }),
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
  // firestore() {
  //   let roadcode = localStorage.getItem("RoadCode");
  //   return {
  //     messages: weatherApi
  //       .collection("ReportAccident")
  //       .doc(roadcode)
  //       .collection("accidents")
  //       .orderBy("time"),
  //   };
  // },
};
</script>
