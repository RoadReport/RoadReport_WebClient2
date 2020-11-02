import Vue from "vue";
import Router from "vue-router";

import app from "./App";

import RoadEvent from "@/pages/RoadEvent";
import Weather from "@/pages/Weather";
import LiveCam from "@/pages/LiveCam";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: app,
    },
    {
      path: "/roadevent",
      name: "RoadEvent",
      component: RoadEvent,
    },
    {
      path: "/weather",
      name: "Weather",
      component: Weather,
    },
    {
      path: "/livecam",
      name: "LiveCam",
      component: LiveCam,
    },
  ],
});
