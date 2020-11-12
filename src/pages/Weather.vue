<template>
  <v-container>
    <v-row dense>
       <v-col cols="12" v-for="(item, key, index) in weatherInfo" :key="item.stationId">
<!--      <v-col cols="12">-->
        <v-card elevation="2" class="mx-auto" max-width="480">
          <v-row>
            <v-col cols="3">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    {{ item[0].locationName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item[0].stationId }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="2"> </v-col>
            <v-col cols="3">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    {{ item[0].weatherElement[index].elementValue }}
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
import {aTestFunctionFromWeatherApiService, getWeatherTemp} from "@/service/WeatherApiService";
import {getWeatherInfo} from "@/service/WeatherApiService";

export default {
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
          this.Weather.data.city = data.records.location[0].locationName;
          this.weatherInfo = data.records.location[0].locationName;
          this.city = "asd";
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
  mounted() {
    aTestFunctionFromWeatherApiService();
    getWeatherInfo("C0R150")
    getWeatherTemp.then((response) => {
      let temp = response.records.location[0];
      console.log(temp.locationName + temp.stationId + temp.weatherElement[0].elementName + temp.weatherElement[0].elementValue);

      this.weatherInfo = response.records;

      let parsedObj = JSON.parse(JSON.stringify(this.weatherInfo));
      console.log("parsedObj will be: " + parsedObj.location[0].locationName);
    });
  },
};
</script>
