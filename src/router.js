import Vue from "vue";
import VueRouter from "vue-router";

import app from "./app";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: app,
      redirect: "/home",
    },
  ],
});
