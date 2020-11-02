<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg" />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item to="/login" link>
          <v-list-item-content>
            <v-list-item-title class="title">未登入</v-list-item-title>
            <v-list-item-subtitle>好平台，不登入嗎?</v-list-item-subtitle>
          </v-list-item-content>
          <v-icon>mdi-chevron-right</v-icon>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense nav>
        <v-list-item
          v-for="item in section1"
          :key="item.title"
          :to="item.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense nav>
        <v-list-item
          v-for="item in section2"
          :key="item.title"
          :to="item.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense nav>
        <v-list-item
          v-for="item in section3"
          :key="item.title"
          :to="item.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>道路名稱</v-toolbar-title>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer />

      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <span class="mr-2">切換道路</span>
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline lighten-2">
            切換道路
          </v-card-title>
          <v-list nav dense>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-car-info</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>台 24</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <!-- <RoadEvent /> -->
      <router-view />
    </v-main>
  </div>
</template>
<script>
export default {
  name: "Default",

  data: () => ({
    drawer: null,
    dialog: false,
    section1: [
      {
        title: "首頁",
        icon: "mdi-home-outline",
        url: "/roadselect",
      },
      {
        title: "公告",
        icon: "mdi-message-alert-outline",
        url: "/announcement",
      },
    ],
    section2: [
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
        title: "影像",
        icon: "mdi-camera",
        url: "livecam",
      },
    ],
    section3: [
      {
        title: "設定",
        icon: "mdi-cog-outline",
        url: "settings",
      },
      {
        title: "關於",
        icon: "mdi-information-outline",
        url: "about",
      },
    ],
  }),
};
</script>
