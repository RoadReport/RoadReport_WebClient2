import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import { firestorePlugin } from "vuefire";

Vue.use(VueAxios, axios);
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,

  components: {
    App,
  },

  template: "<App/>",
  vuetify,
  render: (h) => h(App),
});
