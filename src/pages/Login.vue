<template>
  <v-card class="mx-auto" color="#26c6da" dark max-width="480">
    <v-card-text>
      <v-row align="center">
        <v-col cols="3">
          <v-img
            src="https://randomuser.me/api/portraits/men/78.jpg"
            alt="Sunny image"
            width="96"
          ></v-img>
        </v-col>
        <v-col cols="9">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                馬英九
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">
                horse@taiwan.com
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Login",
};
</script>
