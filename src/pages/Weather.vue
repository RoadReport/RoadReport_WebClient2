<template>
  <v-container>
    <v-row>
      <v-col class="text-center" v-show="!showProgress">
        <v-progress-circular
        class="justify-center"
        indeterminate
        color="primary"
        ></v-progress-circular>
      </v-col>
      <v-col class="pb-1" cols="12"  v-for="(item, key) in weatherInfo" :key="key">
        <v-card elevation="2" class="mx-auto" max-width="480">
          <v-row>
            <v-col class="justify-start py-2">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    {{ item.locationName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.stationId }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-spacer />

            <v-col class="justify-end py-2 px-0">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    {{ subStringTemp(item.elementValueTemp) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    目前溫度
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col class="justify-end py-2 pl-0">
              <v-list-item class="pl-0" two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular">
                    {{ item.elementValueMin10 }}
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
import {getWeatherInfo} from "@/service/WeatherApiService";

export default {
  name: "Weather",
  data: () => ({
    weatherInfo: [],
    city: "",
  }),
  methods: {
    subStringTemp(temp) {
      return temp.substring(0, 2)
    }
  },
  computed: {
    showProgress() {
      return this.weatherInfo.length > 0;
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
    getWeatherInfo().then((response) => {
      this.weatherInfo = response
    })
  },
};
</script>
