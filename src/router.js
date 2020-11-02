import Vue from "vue";
import Router from "vue-router";

// import app from "./App";
import defaultLayout from "@/layout/default";
import emptyLayout from "@/layout/empty";

import About from "@/pages/About";
import Announcement from "@/pages/Announcement";
import LiveCam from "@/pages/LiveCam";
import Login from "@/pages/Login";
import RoadEvent from "@/pages/RoadEvent";
import RoadSelect from "@/pages/RoadSelect";
import Settings from "@/pages/Settings";
import Weather from "@/pages/Weather";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: defaultLayout,
      redirect: "/roadselect",
      children: [
        {
          path: "/about",
          name: "About",
          component: About,
        },
        {
          path: "/announcement",
          name: "Announcement",
          component: Announcement,
        },
        {
          path: "/roadselect",
          name: "RoadSelect",
          component: RoadSelect,
        },
        {
          path: "/roadevent",
          name: "RoadEvent",
          component: RoadEvent,
        },
        {
          path: "/settings",
          name: "Settings",
          component: Settings,
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
    },
    {
      path: "/",
      name: "empty",
      component: emptyLayout,
      children: [
        {
          path: "/login",
          name: "Login",
          component: Login,
        },
      ],
    },
  ],
});
