import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// import VueCookies from "vue-cookies";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import router from "./router";

// Vue.use(VueCookies);
Vue.use(firestorePlugin);

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
// Vue.use(VueRouter)

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,

  components: {
    App,
  },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },

  template: "<App/>",
  vuetify,
  render: (h) => h(App),
});
