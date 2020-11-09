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
                    {{ city }}地點
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
  src: "../service/Weather.js",
  name: "Weather",
  data: () => ({
    weatherInfo: [],
    city: "",
  }),
  methods: {
    getWeather() {
      this.$axios
        .get(
          "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWB-5E768A58-42AC-42E6-AE2F-078BE496737A&format=JSON&elementName=TEMP"
        )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // let datas = res.data.data[0];//下标为0即表示当天天气数据
          this.Weather.data.city = data.records.location[0].locationName;
          this.weatherInfo = data.records.location[0].locationName;
          this.Weather.city = "asd";
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
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
