import Vue from "vue";
import App from "./App.vue";
// import VueRouter from 'vue-router'
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
// import firebase from "firebase/app";
// import "firebase/firestore";

Vue.use(firestorePlugin);

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
// Vue.use(VueRouter)

Vue.config.productionTip = false;

// var firebaseConfig = {
//   apiKey: "AIzaSyDc9uJ-RzpHBkpXWSedJqa8UuzbidMeK5E",
//   authDomain: "roadreport-24.firebaseapp.com",
//   databaseURL: "https://roadreport-24.firebaseio.com",
//   projectId: "roadreport-24",
//   storageBucket: "roadreport-24.appspot.com",
//   messagingSenderId: "549621644976",
//   appId: "1:549621644976:web:d85562bec82925c75c4575",
//   measurementId: "G-L7H3SPSQ73",
// };

// firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
