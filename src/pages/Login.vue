<template>
  <v-container>
    <v-row class="justify-center">
      <v-card class="mx-4 pb-2" max-width="480">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">帳號資訊</div>
            <v-list-item-title class="headline mb-1">{{ displayName }}</v-list-item-title>
            <v-list-item-subtitle class="subtitle-1">{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn elevation="3" color="primary" min-width="100%" @click="socialLogin" v-show="!isSignedIn">
            註冊 / 登入
          </v-btn>
          <v-btn color="primary" outlined @click="signOut" v-show="isSignedIn">
            登出
          </v-btn>
        </v-card-actions>

        <v-divider class="mx-2 mt-2" v-show="!isSignedIn"/>

        <v-card-text v-show="!isSignedIn">
          註冊或登入即表示您同意我們的
          <a target="_blank" href="https://bit.ly/RoadRPp">隱私權政策</a>
          和
          <a target="_blank" href="https://bit.ly/RoadRTos">服務條款</a>。
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: "Login",
  data: () => ({
    isSignedIn: false,
    displayName: "未登入",
    email: "好平台，不登入嗎?",
    photoURL: "",
  }),
  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoURL = user.photoURL;
        this.isSignedIn = true;

        console.log(user);
      } else {
        this.displayName = "未登入";
        this.email = "好平台，不登入嗎?";
        this.photoURL = "https://www.flaticon.com/svg/static/icons/svg/14/14660.svg";
        this.isSignedIn = false;
      }
    })
  },
  methods: {
    socialLogin() {
      let provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {  // eslint-disable-line no-unused-vars
        // this.$router.go(0);
      }).catch((err) => {
        alert("Debug message: " + err.message)
      });

    },
    signOut() {
      firebase.auth().signOut();
    },
  }
};
</script>
