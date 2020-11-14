<template>
  <v-card class="mx-auto" color="#26c6da" dark max-width="480">
    <v-card-text>
      <v-row align="center">
        <v-col cols="3">
          <v-img
            src="https://randomuser.me/api/portraits/men/78.jpg"
            alt="Sunny image"
            width="96"
          ></v-img>
        </v-col>
        <v-col cols="6">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                馬英九
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">
                horse@taiwan.com
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="3">
        <v-btn elevation="3" outlined x-large  >登入</v-btn>
        <facebook-login class="button"
              appId = "178598010098336"
              @login="getUserData"
              @logout="onLogout"
              @get-initial-status="getUserData">
        </facebook-login>
        </v-col>
      </v-row>    
    </v-card-text>
  </v-card>
</template>

<script>
// import Vue from "vue";
import facebookLogin from 'facebook-login-vuejs';

export default {
  name: "Login",

  components: {
    facebookLogin
  },

  methods:
  {
    getUserData() {
        this.FB.api('/me', 'GET', {fields: 'id,name,email'},
          userInformation => {
            console.warn('data api', userInformation)
            this.personalID = userInformation.id;
            this.email = userInformation.email;
            this.name = userInformation.name;
          }
        )
      },

      sdkLoaded(payload) {
        this.isConnected = payload.isConnected
        this.FB = payload.FB
        if (this.isConnected) this.getUserData()
      },

      onLogin() {
        this.isConnected = true
        this.getUserData()
      },

      onLogout() {
        this.isConnected = false;
      },

  }

  

};
</script>
