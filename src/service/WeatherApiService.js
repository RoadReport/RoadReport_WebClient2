export const getWeatherTemp = fetch(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?" +
    "Authorization=CWB-5E768A58-42AC-42E6-AE2F-078BE496737A" +
    "&format=JSON" +
    "&elementName=TEMP" +
    "&stationId=C0R150"
);
// .then((res) => {
//   console.log(res.records.location[0].locationName);
//   return res.json();
// });
