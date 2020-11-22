<template>
  <v-container>
    <v-row>
      <v-col cols="12" v-show="!showProgress">
        <v-alert type="info">
          如果讀取太久可能是程式出問題了，請點選其他頁面並重新進入本頁面。
        </v-alert>
      </v-col >
      <v-col class="text-center" cols="12" v-show="!showProgress">
        <v-progress-circular
            class="justify-center"
            indeterminate
            color="primary"
        ></v-progress-circular>
      </v-col>
      <v-col class="pb-1" cols="12" v-for="(item, key) in weatherInfo" :key="key">
        <v-card elevation="2" class="mx-auto" max-width="480" color="#4aa285">
          <v-row>
            <v-col class="justify-start py-2">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular white--text">
                    {{ item.locationName }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <span class="weatherCardSubtitleTextColor">{{ item.stationId }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-spacer/>

            <v-col class="justify-end py-2 px-0">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular white--text">
                    {{ subStringTemp(item.elementValueTemp) }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <span class="weatherCardSubtitleTextColor">目前溫度</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>

            <v-col class="justify-end py-2 pl-0">
              <v-list-item class="pl-0" two-line>
                <v-list-item-content>
                  <v-list-item-title class="title font-weight-regular white--text">
                    {{ item.elementValueMin10 }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="weatherCardSubtitleTextColor">
                    <span class="weatherCardSubtitleTextColor">10 分鐘雨量</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-divider />
        <p class="mt-2">
          數值來源為中央氣象局放置於各地的自動氣象站，本頁擷取鄰近於該道路之氣象站資訊。<br><br>
          數值含意：<br>
          -998.00：表示過去六小時內無降雨<br>
          0.00 或以上：過去 10 分鐘內降雨量
        </p>
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

<style scoped>
.weatherCardSubtitleTextColor {
  color: #eeeeee;
}
</style>