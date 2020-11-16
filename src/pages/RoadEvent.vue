<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" v-for="(link, i) in messages" :key="i">
        <v-card elevation="2" class="mx-auto" max-width="480">
          <v-card-text>
            {{ link.situationType }}
            <span class="body-1 text--primary">{{ link.locationText }}</span>
          </v-card-text>

          <v-card-text class="body-1 text--primary">
            {{ link.situation }}
          </v-card-text>

          <v-row dense align="center" justify="center">
            <v-img :src="link.imageUrl" max-width="400"></v-img>
          </v-row>

          <v-list-item class="grow">
            <v-row align="center" justify="end">
              <span class="subheading">{{ link.userName }}</span>
            </v-row>
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
  methods: {},
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
        .orderBy("time"),
    };
  },
};
</script>
