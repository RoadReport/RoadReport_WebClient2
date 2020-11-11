const axios = require("axios");

// const cors = "https://cors-anywhere.herokuapp.com/";

export const getWeatherTemp = axios({
  method: "get",
  url: "/weatherApi/O-A0001-001",
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
  })