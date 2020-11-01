<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-5" cols="12">
        <v-card
          elevation="2"
          class="mx-auto"
          max-width="480"
          v-for="(link, i) in importantLinks"
          :key="i"
        >
        <img :src="link.imageUrl">
          <div class="text--primary">
            {{ link.text }}
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
export default {
  name: "RoadEvent",

  data: () => ({
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com",
        imageUrl: "https://i.imgur.com/9hemARl.jpg"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify",
        imageUrl: "https://i.imgur.com/O5cxATL.jpg"
      },
    ],
  }),
};
</script>
