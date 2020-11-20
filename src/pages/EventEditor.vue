<template>
  <v-container>
    <v-row class="justify-center">
     
     
      <!-- <h3>事件編輯器</h3> -->



      <v-col>
        <h5>目前所在道路</h5>
        <v-text-field label="路段" single-line solo></v-text-field>
        <h5>事件種類</h5>
        <v-select label="請選擇事故種類" solo :items="dropdown_font"></v-select>
        <h5>地點 - 10 字內</h5>
        <v-text-field label="明顯地標或公里數" single-line solo append-icon="mdi-map-marker"></v-text-field>
        <h5>狀況</h5>
        <v-textarea label="簡短描述你眼前發生之狀況" single-line solo no-resize rows="5"></v-textarea>
        <h5>圖片 - 選擇性</h5>
        <v-file-input accept="image/*" label="File input"></v-file-input>

        <v-btn color="primary" elevation="4" x-large><v-icon left>mdi-send</v-icon>送出</v-btn>

      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EventEditor",

 data: () => ({
    dropdown_font: ['事故', '注意', '臨檢', '測速', '天氣', '其他'],
  }),

};
</script>
