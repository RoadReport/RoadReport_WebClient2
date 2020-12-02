<template>
  <v-container>
    <v-row class="justify-center">
      <v-col>
        <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
        <v-alert type="info">
          暫不支援「地圖選位」和「圖片上傳」
        </v-alert>
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
            :rules="[v => !!v || '請選擇事故種類']"
            required
        ></v-select>

        <h5 class="mb-2">地點</h5>
        <v-text-field
            v-model="locationText"
            :value="locationText"
            label="明顯地標或公里數"
            single-line
            solo
            append-icon="mdi-map-marker"
            :rules="[v => !!v || '請輸入地點']"
            required
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
            :rules="[v => !!v || '請輸入狀況']"
            required
        ></v-textarea>

        <h5 class="mb-2">圖片 - 選擇性 (暫未開放)</h5>
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
        </v-form>
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
      { text: '事故', value: 1 },
      { text: '注意', value: 2 },
      { text: '臨檢', value: 3 },
      { text: '測速', value: 4 },
      { text: '天氣', value: 5 },
      { text: '其他', value: 6 },
    ],

    value: true,

    currentRoadText: getCurrRoadName(),

    currentRoadCode: getCurrentRoadCode(),
    displayName: '',
    userUid: '',
    situationType: '',
    locationText: '',
    situation: '',
    imageUrl: '',

    isSignedIn: false,
  }),
  beforeCreate() {
    if (localStorage.getItem("RoadCode") == null) {
      console.log("You fucking donkey!");
      this.$router.push("roadselect");
      console.log(
          "%c ",
          "font-size:800px; background:url(https://i.pinimg.com/originals/ad/fa/0c/adfa0c865a9312afea03150e1fb1cfbd.gif) no-repeat;"
      );
    }
  },
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
        a = 1;
      } else if (s == '注意') {
        a = 2;
      } else if (s == '臨檢') {
        a = 3;
      } else if (s == '測速') {
        a = 4;
      } else if (s == '天氣') {
        a = 5;
      } else if (s == '其他') {
        a = 6;
      }

      console.log(this.situationType.text)

      if(this.locationText != '' && this.situation != '' && this.situationType != '')
      {
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
            window.history.go(-1);
          })
      }
      else
      {
        this.$refs.form.validate()
      } 
      
    },
  },

};
</script>
