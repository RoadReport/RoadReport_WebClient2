import { fetchDynamicWeatherStation } from "@/service/FirebaseRemoteConfigService";

const axios = require("axios");

const OPENDATA_AUTH =  "CWB-5E768A58-42AC-42E6-AE2F-078BE496737A";

function getDynamicWeatherStationJson() {
  let data = fetchDynamicWeatherStation();
  let list = JSON.parse(data._value);
  return list;
}

function fetchWeatherData(stationID) {
axios
  .all([
    axios.get(
      "https://cors-anywhere.herokuapp.com/https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001",
      {
        params: {
          Authorization: OPENDATA_AUTH,
          format: "JSON",
          elementName: "TEMP",
          stationId: stationID,
        },
      }
    ),
    axios.get(
      "https://cors-anywhere.herokuapp.com/https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001",
      {
        params: {
          Authorization: OPENDATA_AUTH,
          format: "JSON",
          elementName: "MIN_10",
          stationId: stationID,
        },
      }
    ),
  ])
  .then(
    axios.spread((response1, response2) => {
      console.log("----- I am here -----");
      console.log(
        "Response 1",
        response1.data.records.location[0],
        " Response 2",
        response2.data.records.location[0]
      );

      let responseJson = {
        locationName: response1.data.records.location[0].locationName,
        stationId: response1.data.records.location[0].stationId,
        elementValueTemp:
          response1.data.records.location[0].weatherElement[0].elementValue,
        elementValueMin10:
          response2.data.records.location[0].weatherElement[0].elementValue,
        elementValueRain: 999,
      };

      return responseJson;
    })
  )
  .catch((error) => {
    // Error
    console.log(error);
  });
}

export function getWeatherInfo() {
  let list = getDynamicWeatherStationJson();
  const promises = [];
  // let data = [];

  for (let i = 0; i < list.length; i++) {
    promises.push(fetchWeatherData(list[i].stationId));
  }

  Promise.all(promises).then((results) => {
    console.log("Here is the results:");
    console.log(results);
  })

  // for (let i = 0; i < list.length; i++) {
  //   let responseJson = fetchWeatherData(list[i].stationId);
  //   data.push(JSON.stringify(responseJson));
  // }

  // console.log(data);
}

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
