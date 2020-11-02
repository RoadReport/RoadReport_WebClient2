<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <v-card
          elevation="2"
          class="mx-auto"
          max-width="480"
          v-for="(link, i) in messages"
          :key="i"
        >
          <v-img :src="link.imageUrl" max-width="480"> </v-img>
          <div class="text--primary">
            {{ link.userUid }}
          </div>
          <div class="text--primary">
            {{ link.locationText }}
          </div>
        </v-card>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          Important Links
        </h2>

        <v-row justify="center">
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../firestore";

export default {
  name: "RoadEvent",
  data() {
    return {
      messages: [],
      importantLinks: [],
    };
  },
  mounted: function() {
    this.$bind(
      "messages",
      db
        .collection("ReportAccident")
        .doc("0")
        .collection("accidents")
        .orderBy("time")
    );
  },
  // data: () => ({
  //   districts: [],
  //   importantLinks: [
  //     {
  //       text: "Documentation",
  //       href: "https://vuetifyjs.com",
  //       imageUrl: "https://i.imgur.com/9hemARl.jpg"
  //     },
  //     {
  //       text: "Articles",
  //       href: "https://medium.com/vuetify",
  //       imageUrl: "https://i.imgur.com/O5cxATL.jpg"
  //     },
  //   ],
  // }),

  // firestore() {
  //   return {
  //     districts: db.collection('districts').orderBy('name')
  //   }
  // }
};
</script>
