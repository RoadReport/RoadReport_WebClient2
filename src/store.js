import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    RoadCode: -1,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("RoadCode")) {
        state.RoadCode = localStorage.getItem("RoadCode");
      }
    },
    setRoadcode(roadcode) {
      let data = JSON.parse(JSON.stringify(roadcode));
      console.log(data);
      localStorage.setItem("RoadCode", roadcode);
    },
  },
  actions: {},
});
