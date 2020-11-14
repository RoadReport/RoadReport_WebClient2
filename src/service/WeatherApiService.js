import { fetchDynamicWeatherStation } from "@/service/FirebaseRemoteConfigService";

const axios = require("axios");

const OPENDATA_AUTH = "CWB-5E768A58-42AC-42E6-AE2F-078BE496737A";

function getDynamicWeatherStationJson() {
  let data = fetchDynamicWeatherStation();
  return JSON.parse(data._value);
}

async function fetchWeatherData(stationID) {
  const [firstResponse, secondResponse] = await Promise.all([
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
    )
  ]);

  return {
    locationName: firstResponse.data.records.location[0].locationName,
    stationId: firstResponse.data.records.location[0].stationId,
    elementValueTemp:
    firstResponse.data.records.location[0].weatherElement[0].elementValue,
    elementValueMin10:
    secondResponse.data.records.location[0].weatherElement[0].elementValue,
    elementValueRain: 999,
  };
}

export async function getWeatherInfo() {
  let list = getDynamicWeatherStationJson();
  let data = [];

  for (let i = 0; i < list.length; i++) {
    let wow = await fetchWeatherData(list[i].stationId)
    data.push(wow);
  }

  return data
}

