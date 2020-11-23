<template>
  <v-container>
    <v-row class="justify-center">
     
     
      <!-- <h3>事件編輯器</h3> -->



      <v-col>
        <h5>目前所在道路</h5>
        <v-select  label="路段" solo :items="RoadChoice"></v-select>
        <h5>事件種類</h5>
        <v-select v-model="situationType" :value="EventSelection" label="請選擇事故種類" solo :items="EventSelection"></v-select>
        <h5>地點 - 10 字內</h5>
        <v-text-field v-model="locationText" :value="locationText" label="明顯地標或公里數" single-line solo append-icon="mdi-map-marker"></v-text-field>
        <h5>狀況</h5>
        <v-textarea v-model="situation" :value="situation" label="簡短描述你眼前發生之狀況" single-line solo no-resize rows="5"></v-textarea>
        <h5>圖片 - 選擇性</h5>
        <v-file-input accept="image/*" label="File input"></v-file-input>

        <v-btn color="primary" elevation="4" x-large @click="add"><v-icon left>mdi-send</v-icon>送出</v-btn>

      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import {db} from "@/service/FirebaseFirestoreService";
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: "EventEditor",

  data: () => ({
    RoadChoice: ['台24', '182縣道'],
    EventSelection: ['事故', '注意', '臨檢', '測速', '天氣', '其他'],

    locationText: '',
    situation: '',
    situationType: '',
    displayName: '',
    userUid: '',
  }),

  mounted: function () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.displayName = user.displayName;
        this.userUid = user.uid;  
      } else {
        console.log("未登入");
      }
    })
  },

  methods: {
    add() {
         db.collection('ReportAccident').doc('1').collection('accidents').add({
            imageUrl: '',
            locationGeoPoint: new firebase.firestore.GeoPoint( 0, 0 ),
            locationText: this.locationText,
            situation: this.situation,
            situationType: Number(this.situationType),
            time: firebase.firestore.FieldValue.serverTimestamp(),
            userName: this.displayName,
            userUid: this.userUid,
        })
        .then(function(docRef)  {
          console.log('成功', docRef.id);
        })
        
        
   


    },
  },

};
</script>
