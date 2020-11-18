<template>
  <v-container>
    <v-row>
      <v-col class="pb-0" cols="12" v-for="(item, i) in items" :key="i">
        <v-card
          class="mx-auto py-2"
          max-width="480"
          :color="item.color"
          @click="selectRoad(item.roadcode)"
          link
          dark
        >
          <div class="d-flex flex-no-wrap justify-space-between align-center pl-4 pr-2">
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="headline">
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.artist }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-avatar class="ma-3" size="80" tile>
              <v-img :src="item.src"/>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "RoadSelect",
  data: () => ({
    items: [
      {
        color: "#F573A0",
        src: "https://image.flaticon.com/icons/svg/1087/1087436.svg",
        title: "台 24",
        artist: "位於屏東霧台鄉",
        roadcode: 0,
      },
      {
        color: "#1E88E5",
        src: "https://image.flaticon.com/icons/svg/588/588019.svg",
        title: "182 縣道",
        artist: "位於台南高雄交界",
        roadcode: 1,
      },
    ],
  }),
  methods: {
    selectRoad(roadcode) {
      localStorage.setItem("RoadCode", roadcode);
      // this.$router.push("roadevent");
    },
  },
};
</script>
