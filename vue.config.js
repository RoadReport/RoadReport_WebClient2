module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "看路",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
  },
  devServer: {
    proxy: {
      "/weatherApi": {
        target: "https://cors-anywhere.herokuapp.com/https://opendata.cwb.gov.tw/api/v1/rest/datastore",
        changeOrigin: true,
        pathRewrite: {
          "^/weatherApi": "",
        },
      },
    },
  },
};
