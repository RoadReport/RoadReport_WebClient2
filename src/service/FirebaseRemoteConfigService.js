import {firebaseGlobal} from "@/service/firestore";

const remoteConfig = firebaseGlobal.remoteConfig()

remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000,
};

remoteConfig
  .ensureInitialized()
  .then(() => {
    console.log("Firebase Remote Config is initialized");
  })
  .catch((err) => {
    console.error("Firebase Remote Config failed to initialize", err);
  });

remoteConfig
  .fetchAndActivate()
  .then(() => {
    console.log("fetchAndActivate Success!");
  })
  .catch((err) => {
    console.error(err);
  });

remoteConfig.defaultConfig = {
  ANDROID_MIN_VER: "999",
};

export const fetchDynamicWeatherStation = function () {
  let roadcode = localStorage.getItem("RoadCode");
  switch (parseInt(roadcode)) {
    case 0:
      return remoteConfig.getValue("ROADCODE_24");
    case 1:
      return remoteConfig.getValue("ROADCODE_182");
    case 2:
      return remoteConfig.getValue("ROADCODE_GRANDMA");
    default:
      return remoteConfig.getValue("ROADCODE_24");
  }
}

export const fetchDynamicLiveCamSource = function () {
  let roadcode = localStorage.getItem("RoadCode");
  switch (parseInt(roadcode)) {
    case 0:
      console.log("case 0 here")
      return remoteConfig.getValue("DLCS_24");
    case 1:
      console.log("case 1 here")
      return remoteConfig.getValue("DLCS_182");
    case 2:
      return remoteConfig.getValue("DLCS_GRANDMA");
    default:
      console.log("case default here")
      return remoteConfig.getValue("DLCS_24");
  }
}