<template>
  <v-container>
    <v-row>
      <v-col class="mb-5" cols="12" v-for="(link, i) in messages" :key="i">
        <v-card elevation="2" class="mx-auto" max-width="480">
          <v-card-text>
            {{ link.situationType }}
            <span class="body-1 text--primary">{{ link.locationText }}</span>
          </v-card-text>

          <v-card-text class="body-1 text--primary">
            {{ link.situation }}
          </v-card-text>

          <v-row align="center" justify="center">
            <v-img
              class="text-center"
              :src="link.imageUrl"
              max-width="420"
            ></v-img>
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
import { db } from "../firestore";

export default {
  name: "RoadEvent",

  data: () => ({
    messages: [],
  }),

  firestore: {
    messages: db
      .collection("ReportAccident")
      .doc("0")
      .collection("accidents")
      .orderBy("time"),
  },
};
</script>
