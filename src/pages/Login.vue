<template>
  <v-card class="mx-auto" color="#26c6da" dark max-width="480">
    <v-card-text>
      <v-row align="center">
        <v-col cols="3">
          <v-img
            :src="photoURL"
            alt="Sunny image"
            width="96"
          ></v-img>
        </v-col>
        <v-col cols="6">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{displayName}}
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">
                {{email}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col cols="3">
        <v-btn elevation="3" outlined x-large @click="socialLogin" v-show="SignInShowButton">登入</v-btn>
        <v-btn elevation="3" outlined x-large @click="signOut" v-show="SignOutShowButton">登出</v-btn>
        </v-col>
      </v-row>    
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: "Login",

  data:() => ({

    SignInShowButton:1,
    SignOutShowButton:0,

    photoURL:'',
    displayName:'',
    email:'',

  }),

  beforeCreate: function() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.

        this.photoURL = user.photoURL;
        this.displayName = user.displayName;
        this.email = user.email;

        console.log(user);

        console.log(user.photoURL);
        console.log(user.displayName);
        console.log(user.email);

        this.SignInShowButton = 0;
        this.SignOutShowButton = 1;

      } else {
        // User is signed out.   

        this.photoURL = 'https://randomuser.me/api/portraits/men/78.jpg';
        this.displayName = '馬英九(未登入)';
        this.email = 'horse@taiwan.com(未登入)';
        
        console.log('user.photoURL');
        console.log('user.displayName');
        console.log('user.email');

        this.SignInShowButton = 1;
        this.SignOutShowButton = 0;

      }
    })

  },

  methods: {
    socialLogin() {
      var provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then((result) => {     // eslint-disable-line no-unused-vars
        
        this.$router.go(0);
        //beforeCreate

      }).catch((err) => {
        
        alert('Oops. ' + err.message)

      });

    },

    signOut() {

      firebase.auth().signOut();

    },

  }

};
</script>
