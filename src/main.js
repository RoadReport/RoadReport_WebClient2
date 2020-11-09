import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
 
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
