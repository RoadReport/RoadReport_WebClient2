<template>
  <v-container>
    <v-fab-transition>
      <v-btn
          v-show="isSignedIn"
          to="/eventeditor"
          color="#03DAC6"
          dark
          fixed
          bottom
          right
          fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-row>
      <v-col class="pb-1" cols="12" v-for="(link, i) in messages" :key="i">
        <v-card
            class="justify-center mx-auto"
            :class="detectSituationTypeToSetBorder(link.situationType)"
            max-width="480"
        >
          <v-list-item class="pt-1 pb-0 px-2">
            <span class="body-1 text--primary px-1 py-0 situationTypeTextBorder">
              {{ convertSituationTypeToText(link.situationType) }}
            </span>
            <span class="body-1 text--primary ml-2">{{ link.locationText }}</span>
            <v-spacer/>

            <v-dialog max-width="440">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" v-show="isSignedIn">
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
  
              <v-list nav>
                <v-list-item-group color="primary">
                  <!-- <v-list-item v-for="(item, i) in select" :key="i" :to="item.url" dense>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item> -->
                  <v-list-item to="">
                    <v-list-item-content>
                      <v-list-item-title>編輯</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="delectSelectDoc(link.id)">
                    <v-list-item-content>
                      <v-list-item-title>刪除</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-dialog>

           
          </v-list-item>

          <v-card-text class="body-1 text--primary pt-0 px-2">
            {{ link.situation }}<br>{{link.id}} 
          </v-card-text>

          <div class="justify-center pl-2 pr-3">
            <v-img :src="link.imageUrl" max-width="100%" max-height="600px"/>
          </div>

          <v-list-item class="pl-2 pr-3">
            <span class="body-2">{{ convertTimestamp(link.time) }}</span>
            <v-spacer/>
            <span class="body-2">{{ link.userName }}</span>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {firebaseGlobal} from "@/service/FirebaseService";
import {db} from "@/service/FirebaseFirestoreService";

export default {
  name: "RoadEvent",
  data: () => ({
    messages: [],
    isSignedIn: false,

    select: [
      {
        title: "編輯",
        url: "/",
      },
      {
        title: "刪除",
        url: "/",
      },
    ],
  }),
  methods: {
    convertSituationTypeToText(situationType) {
      switch (situationType) {
        case 1:
          return "事故";
        case 2:
          return "注意";
        case 3:
          return "臨檢";
        case 4:
          return "測速";
        case 5:
          return "天氣";
        case 6:
          return "其他";
        default:
          return "其他";
      }
    },
    detectSituationTypeToSetBorder(type) {
      switch (type) {
        case 1:
        case 2:
          return "bg_accident_type_2";
        case 3:
        case 4:
          return "bg_accident_type_1";
        case 5:
          return "bg_accident_type_4";
        case 6:
          return "bg_accident_type_5";
        default:
          return "bg_accident_type_5";
      }
    },
    formatCompat(date) {
      return date.getMonth() + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    },
    convertTimestamp(time) {
      let date = new Date(time.seconds * 1000);
      return this.formatCompat(date);
    },
    delectSelectDoc(docId){
      let roadcode = localStorage.getItem("RoadCode");
      db.collection("ReportAccident")
          .doc(roadcode)
          .collection("accidents")
          .doc(docId)
          .delete()
    },
    asd(){
console.log('aaa');
    },
    
  },
  beforeCreate() {
    if (localStorage.getItem("RoadCode") == null) {
      this.$router.push("roadselect");
      console.log("You fucking donkey.");
      console.log(
          "%c ",
          "font-size:800px; background:url(https://i.pinimg.com/originals/ad/fa/0c/adfa0c865a9312afea03150e1fb1cfbd.gif) no-repeat;"
      );
    }
  },
  mounted() {
    firebaseGlobal.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    })
  },
  firestore() {
    let roadcode = localStorage.getItem("RoadCode");
    return {
      messages: db
          .collection("ReportAccident")
          .doc(roadcode)
          .collection("accidents")
          .orderBy("time", "desc"),
    };
  },
};
</script>

<style scoped>
.situationTypeTextBorder {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 2px;
}

.bg_accident_type_1 {
  border-left: 6px solid #F44336;
}

.bg_accident_type_2 {
  border-left: 6px solid #FF9800;
}

.bg_accident_type_3 {
  border-left: 6px solid #4CAF50;
}

.bg_accident_type_4 {
  border-left: 6px solid #2196F3;
}

.bg_accident_type_5 {
  border-left: 6px solid #616161;
}
</style>