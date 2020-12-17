<template>
  <v-container>
    <v-row class="justify-center">
      <v-col>
        <v-form
            ref="form"
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

          <v-btn color="primary" elevation="4" block v-show="isSignedIn" @click="submit">
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
    EventSelection: ['事故', '注意', '臨檢', '測速', '天氣', '其他', '坍方', '落石'],
    EventSelections: [
      {text: '事故', value: 1},
      {text: '注意', value: 2},
      {text: '臨檢', value: 3},
      {text: '測速', value: 4},
      {text: '天氣', value: 5},
      {text: '其他', value: 6},
      {text: '坍方', value: 7},
      {text: '落石', value: 8},
    ],

    value: true,

    isSignedIn: false,
    isEditMode: false,

    currentRoadText: getCurrRoadName(),

    currentRoadCode: getCurrentRoadCode(),
    displayName: '',
    userUid: '',
    situationType: '',
    locationText: '',
    situation: '',
    imageUrl: '',
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
    // Check is edit mode or not.
    if (this.$route.query.editMode === "true") {
      this.isEditMode = true
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isSignedIn = true;
        this.displayName = user.displayName;
        this.userUid = user.uid;
      } else {
        this.isSignedIn = false;
        console.log("未登入");
        window.history.go(-1);
      }
    })
  },

  firestore() {
    // If is edit mode, get doc from firestore once.
    if (this.$route.query.editMode === "true") {
      console.log("Is edit mode!")
      db.collection('ReportAccident')
          .doc(this.currentRoadCode)
          .collection('accidents')
          .doc(this.$route.query.docId)
          .get()
          .then(snapshot  => {
            const document = snapshot.data()

            // TODO(Find a better way to deal this shit)
            let tempSituationType = "其他"
            switch (document.situationType) {
              case 1:
                tempSituationType = "事故"
                break
              case 2:
                tempSituationType = "注意"
                break
              case 3:
                tempSituationType = "臨檢"
                break
              case 4:
                tempSituationType = "測速"
                break
              case 5:
                tempSituationType = "天氣"
                break
              case 6:
                tempSituationType = "其他"
                break
              case 7:
                tempSituationType = "坍方"
                break
              case 8:
                tempSituationType = "落石"
                break
            }
            this.situationType = tempSituationType
            this.locationText = document.locationText
            this.situation = document.situation
          })
    }
  },

  methods: {
    submit() {
      // TODO(Find a better way to deal this shit)
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
      } else if (s == '坍方') {
        a = 7;
      } else if (s == '落石') {
        a = 8;
      }

      if (this.isEditMode) {
        // Edit event.
        db.collection('ReportAccident')
            .doc(this.currentRoadCode)
            .collection('accidents')
            .doc(this.$route.query.docId)
            .update({
              situationType: Number(a),
              locationText: this.locationText,
              situation: this.situation,
            })
            .then(function () {
              console.log('修改成功');
              window.history.go(-1);
            })

      } else {
        // Add event.
        if (this.locationText != '' && this.situation != '' && this.situationType != '') {
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
                console.log('新增成功', docRef.id);
                window.history.go(-1);
              })
        } else {
          this.$refs.form.validate()
        }

      }
    },
  },

};
</script>
