<template>
  <v-app>
    <div>
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="photoURL"/>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item to="/login" link>
            <v-list-item-content>
              <v-list-item-title class="title">{{ displayName }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
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
        
      </v-navigation-drawer>

      <v-app-bar app class="mb-2" color="white" light>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <div class="d-flex align-center">
          <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="../assets/bollard_forRound.png"
              transition="scale-transition"
              width="40"
          />
        </div>
        <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>
        <v-spacer />
      </v-app-bar>

      <v-main>
        <!-- <RoadEvent /> -->
        <router-view/>
      </v-main>
    </div>
  </v-app>
</template>
<script>

import firebase from 'firebase/app';
import 'firebase/auth';

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
        icon: "mdi-bullhorn-outline",
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
        title: "即時影像",
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

    photoURL: '',
    displayName: '',
    email: '',
  }),
  computed: {
    toolbarTitle() {
      switch (this.$route.path) {
        case "/roadselect":
          return "看路"
        case "/roadevent":
          return "路況"
        case "/weather":
          return "天氣"
        case "/livecam":
          return "即時影像"
        default:
          return ""
      }
    },
  },
  beforeCreate: function () {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.photoURL = user.photoURL;
        this.displayName = user.displayName;
        this.email = user.email;
        console.log(user);
      } else {
        this.photoURL = "https://www.flaticon.com/svg/static/icons/svg/14/14660.svg";
        this.displayName = "未登入";
        this.email = "好平台，不登入嗎?";
      }
    })

  },
};
</script>
