const axios = require("axios");
import { remoteConfig } from "@/service/firestore";

remoteConfig.getValue("ANDROID_MIN_VER");

export const getWeatherTemp = axios({
  method: "get",
  url:
    "https://cors-anywhere.herokuapp.com/https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001",
  params: {
    Authorization: "CWB-5E768A58-42AC-42E6-AE2F-078BE496737A",
    format: "JSON",
    elementName: "TEMP",
    stationId: "C0R150",
  },
})
  .then(function(response) {
    // Success
    console.log("Opendata status: " + response.status);
    console.log(response.data);
    return response.data;
  })
  .catch(function(error) {
    // Error
    console.log(error);
  });
