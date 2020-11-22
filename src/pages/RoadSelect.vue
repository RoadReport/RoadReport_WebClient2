<template>
  <v-container>
    <v-bottom-sheet v-model="sheetAndroid">
      <v-sheet class="text-center" height="350px">
        <v-btn class="mt-6" text color="red" @click="sheetAndroid = !sheetAndroid">
          關閉
        </v-btn>
        <div class="py-3">
          Android 平台有專用應用程式，<br/>您可以前往 Play Store 下載 APP。
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.txwstudio.app.roadreport"
          >
            <v-img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/zh-tw_badge_web_generic.png"
              width="256"
            >
            </v-img>
          </a>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-bottom-sheet v-model="sheetiOS">
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="red" @click="sheetiOS = !sheetiOS">
          關閉
        </v-btn>
        <div class="py-3">
          點擊分享按鈕，並選擇加入到主畫面。
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-row>
      <v-col>
        <v-banner two-line>
          <v-avatar slot="icon" color="red" size="40">
            <v-icon icon="mdi-lock" color="white">
              mdi-alert-circle-outline
            </v-icon>
          </v-avatar>

          網頁版尚在開發中，使用上若有問題都是正常的。<br/>
          點擊下方連結以查看不同平台的使用說明。

          <template v-slot:actions>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="sheetAndroid = !sheetAndroid"
            >
              Android
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
              @click="sheetiOS = !sheetiOS"
            >
              iOS
            </v-btn>
          </template>
        </v-banner>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pb-0" cols="12" v-for="(item, i) in items" :key="i">
        <v-dialog
            v-model="dialog"
            max-width="440"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-card
                class="mx-auto py-2"
                max-width="480"
                v-bind="attrs"
                v-on="on"
                :color="item.color"
                @click="selectRoad(item.roadcode)"
                link
                dark
            >
              <div
                  class="d-flex flex-no-wrap justify-space-between align-center pl-4 pr-2"
              >
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline">
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.artist }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-avatar class="ma-3" size="80" tile>
                  <v-img :src="item.src"/>
                </v-avatar>
              </div>
            </v-card>
          </template>

          <v-card>
            <v-list nav>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in dialogNavigation" :key="i" :to="item.url">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-dialog>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RoadSelect",
  data: () => ({
    sheetAndroid: false,
    sheetiOS: false,
    items: [
      {
        color: "#F573A0",
        src: "https://image.flaticon.com/icons/svg/1087/1087436.svg",
        title: "台 24",
        artist: "位於屏東霧台鄉",
        roadcode: 0,
      },
      {
        color: "#1E88E5",
        src: "https://image.flaticon.com/icons/svg/588/588019.svg",
        title: "182 縣道",
        artist: "位於台南高雄交界",
        roadcode: 1,
      },
    ],
    dialogNavigation: [
      {
        title: "路況",
        icon: "mdi-car-info",
        url: "roadevent",
      },
      {
        title: "天氣",
        icon: "mdi-weather-cloudy",
        url: "weather",
      },
      {
        title: "即時影像",
        icon: "mdi-camera",
        url: "livecam",
      }
    ],
  }),
  methods: {
    selectRoad(roadcode) {
      localStorage.setItem("RoadCode", roadcode);
      // this.$router.push("roadevent");
    },
  },
};
</script>
