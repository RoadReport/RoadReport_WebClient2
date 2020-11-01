import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
// Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
