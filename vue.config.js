module.exports = {
  transpileDependencies: ["vuetify"],
  pwa: {
    name: "看路",
    short_name: "看路",
    themeColor: "#ffffff",
    msTileColor: "#ffffff",
    backgroundColor: '#ffffff',
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
