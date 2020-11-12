import { fetchDynamicWeatherStation } from "@/service/FirebaseRemoteConfigService";

const axios = require("axios");

const OPENDATA_AUTH =  "CWB-5E768A58-42AC-42E6-AE2F-078BE496737A";

export const aTestFunctionFromWeatherApiService = function() {
  let data = fetchDynamicWeatherStation();
  console.log(data._value);
  let list = JSON.parse(data._value);
  console.log(list[0]);
};

export function getWeatherInfo(stationID) {
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
    .then(axios.spread((data1, data2) => {
      console.log("I am here: ")
      console.log('data1', data1, 'data2', data2)
    }));
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
