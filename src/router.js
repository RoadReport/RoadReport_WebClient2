import Vue from "vue";
import Router from "vue-router";

// import app from "./App";
import defaultLayout from "@/layout/default";
import emptyLayout from "@/layout/empty";

import RoadSelect from "@/pages/RoadSelect";
import RoadEvent from "@/pages/RoadEvent";
import Weather from "@/pages/Weather";
import LiveCam from "@/pages/LiveCam";
import Login from "@/pages/Login";

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
