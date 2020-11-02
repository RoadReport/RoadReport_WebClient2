import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDc9uJ-RzpHBkpXWSedJqa8UuzbidMeK5E",
  authDomain: "roadreport-24.firebaseapp.com",
  databaseURL: "https://roadreport-24.firebaseio.com",
  projectId: "roadreport-24",
  storageBucket: "roadreport-24.appspot.com",
  messagingSenderId: "549621644976",
  appId: "1:549621644976:web:d85562bec82925c75c4575",
  measurementId: "G-L7H3SPSQ73",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ timestampsInSnapshots: true });

export const db = firebase.firestore();
