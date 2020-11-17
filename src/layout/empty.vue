<template>
  <v-app>
    <div>
      <v-app-bar class="mb-2"></v-app-bar>
      <v-main>
        <router-view/>
      </v-main>
    </div>
  </v-app>
</template>
<script>
export default {
  name: "Empty",
};
</script>