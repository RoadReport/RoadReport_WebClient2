import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/remote-config";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc9uJ-RzpHBkpXWSedJqa8UuzbidMeK5E",
  authDomain: "roadreport-24.firebaseapp.com",
  databaseURL: "https://roadreport-24.firebaseio.com",
  projectId: "roadreport-24",
  storageBucket: "roadreport-24.appspot.com",
  messagingSenderId: "549621644976",
  appId: "1:549621644976:web:d85562bec82925c75c4575",
  measurementId: "G-L7H3SPSQ73",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
export const db = firebase.firestore();

export const remoteConfig = firebase.remoteConfig();

remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000,
};

remoteConfig.ensureInitialized()
  .then(() => {
    console.log("Firebase Remote Config is initialized");
  })
  .catch((err) => {
    console.error("Firebase Remote Config failed to initialize", err);
  });

remoteConfig.fetchAndActivate()
  .then(() => {
    console.log("fetchAndActivate Success!");
    showMsg()
  })
  .catch((err) => {
    console.error(err);
  });

remoteConfig.defaultConfig = {
  "ANDROID_MIN_VER": "999",
};

function showMsg() {
  console.log(remoteConfig.getValue("ANDROID_MIN_VER"));
}
