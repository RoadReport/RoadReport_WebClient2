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
        <v-btn elevation="3" outlined x-large @click="socialLongin">登入</v-btn>
        </v-col>
      </v-row>    
    </v-card-text>
  </v-card>
</template>

<script>

import firebase from 'firebase';

export default {
  name: "Login",

  methods: {
    socialLongin() {
      var provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {     // eslint-disable-line no-unused-vars
      
        this.router.replace('home');
        this.token = result.credential.accessToken;
        this.user = result.user;

      }).catch((err) => {
        
        alert('Oops. ' + err.message)

      });

    }
  }

};
</script>
