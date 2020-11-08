import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import router from "./router";
 
Vue.use(firestorePlugin);

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,

  components: {
    App,
  },
  beforeCreate() {},

  template: "<App/>",
  vuetify,
  render: (h) => h(App),
});
