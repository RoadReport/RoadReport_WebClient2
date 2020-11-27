<template>
  <v-container>
    <v-row class="justify-center">
      <v-col>
        <h5 class="mb-2">目前所在道路</h5>
        <v-text-field
            :label="currentRoadText"
            solo
            disabled
        ></v-text-field>

        <h5 class="mb-2">事件種類</h5>
        <v-select
            v-model="situationType"
            label="事故種類"
            solo
            :items="EventSelection"
        ></v-select>

        <h5 class="mb-2">地點</h5>
        <v-text-field
            v-model="locationText"
            :value="locationText"
            label="明顯地標或公里數"
            single-line
            solo
            append-icon="mdi-map-marker"
        ></v-text-field>

        <h5 class="mb-2">狀況</h5>
        <v-textarea
            v-model="situation"
            :value="situation"
            label="簡短描述你眼前發生之狀況"
            single-line
            solo
            no-resize
            rows="5"
        ></v-textarea>

        <h5 class="mb-2">圖片 - 選擇性 (暫時沒有功能)</h5>
        <v-file-input
            disabled
            accept="image/*"
            label="上傳圖片"
            prepend-icon="mdi-camera"
        ></v-file-input>

        <v-btn color="primary" elevation="4" block v-show="isSignedIn" @click="add">
          <v-icon left>mdi-send</v-icon>
          送出
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {db} from "@/service/FirebaseFirestoreService";
import firebase from 'firebase/app';
import 'firebase/auth';
import {getCurrentRoadCode, getCurrRoadName} from "@/service/RoadCode";

export default {
  name: "EventEditor",

  data: () => ({
    EventSelection: ['事故', '注意', '臨檢', '測速', '天氣', '其他'],
    EventSelections: [
      { text: '事故', value: 0 },
      { text: '注意', value: 1 },
      { text: '臨檢', value: 2 },
      { text: '測速', value: 3 },
      { text: '天氣', value: 4 },
      { text: '其他', value: 5 },
    ],

    currentRoadText: getCurrRoadName(),

    currentRoadCode: getCurrentRoadCode(),
    displayName: '',
    userUid: '',
    situationType: { text: '未知錯誤', value: -1 },
    locationText: '',
    situation: '',
    imageUrl: '',

    isSignedIn: false,
  }),

  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isSignedIn = true;
        this.displayName = user.displayName;
        this.userUid = user.uid;
      } else {
        this.isSignedIn = false;
        console.log("未登入");
      }
    })
  },

  methods: {
    add() {
      var s = this.situationType;
      var a;
      if (s == '事故') {
        a = 0;
      } else if (s == '注意') {
        a = 1;
      } else if (s == '臨檢') {
        a = 2;
      } else if (s == '測速') {
        a = 3;
      } else if (s == '天氣') {
        a = 4;
      } else if (s == '其他') {
        a = 5;
      }

      console.log(this.situationType.text)
      db.collection('ReportAccident')
          .doc(this.currentRoadCode)
          .collection('accidents')
          .add({
            userName: this.displayName,
            userUid: this.userUid,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            situationType: Number(a),
            locationText: this.locationText,
            locationGeoPoint: new firebase.firestore.GeoPoint(0, 0),
            situation: this.situation,
            imageUrl: '',
          })
          .then(function (docRef) {
            console.log('成功', docRef.id);
          })
    },
  },

};
</script>
