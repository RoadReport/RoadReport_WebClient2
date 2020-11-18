<template>
  <v-container>
    <v-row>
      <v-col class="pb-1" cols="12" v-for="(link, i) in messages" :key="i">
        <v-card class="justify-center mx-auto" max-width="480">
          <v-list-item class="pt-2 pb-0">
            <span class="body-1 text--primary px-1 py-0 situationTypeTextBorder">{{ convertSituationTypeToText(link.situationType) }}</span>
            <span class="body-1 text--primary ml-2">{{ link.locationText }}</span>
            <v-spacer/>
            <v-btn icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </v-list-item>

          <v-card-text class="body-1 text--primary pt-0">
            {{ link.situation }}
          </v-card-text>

          <div class="justify-center px-4">
            <v-img :src="link.imageUrl" max-width="100%"/>
          </div>

          <v-list-item>
            <span class="subheading">{{ convertTimestamp(link.time) }}</span>
            <v-spacer/>
            <span class="subheading">{{ link.userName }}</span>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "@/service/FirebaseFirestoreService";

export default {
  name: "RoadEvent",
  data: () => ({
    messages: [],
  }),
  methods: {
    convertSituationTypeToText(situationType) {
      switch (situationType) {
        case 0:
          return "事故";
        case 1:
          return "注意";
        case 2:
          return "臨檢";
        case 3:
          return "測速";
        case 4:
          return "天氣";
        case 5:
          return "其他";
        default:
          return "其他";
      }
    },
    formatCompat(date) {
      return date.getMonth() + "/" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
    },
    convertTimestamp(time) {
      let date = new Date(time.seconds * 1000);
      return this.formatCompat(date);
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
</style>