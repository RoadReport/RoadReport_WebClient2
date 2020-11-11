const axios = require("axios");

// const cors = "https://cors-anywhere.herokuapp.com/";

export const getWeatherTemp = fetch(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?" +
    "Authorization=CWB-5E768A58-42AC-42E6-AE2F-078BE496737A" +
    "&format=JSON" +
    "&elementName=TEMP" +
    "&stationId=C0R150"
)
  .then((res) => res.json())
  .then(
    axios({
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
        console.log(response.status);
        console.log(response.data);
        console.log(response.data.records.location[0].locationName);
        this.city = response.data.records.location[0].locationName;
        console.log("aaa");
      })
      .catch(function(error) {
        // Error
        console.log(error);
      })
      .then(function() {
        console.log("always executed");
      })
  );
