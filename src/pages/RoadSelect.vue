<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" v-for="(item, i) in items" :key="i">
        <v-card
          class="mx-auto"
          max-width="480"
          :color="item.color"
          @click="selectRoad(item.roadcode)"
          link
        >
          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <div>
              <v-card-title class="headline" v-text="item.title"></v-card-title>
              <v-card-subtitle v-text="item.artist"></v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="100" tile>
              <v-img :src="item.src" />
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
    },
  },
};
</script>
