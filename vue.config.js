const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      fallback: { path: require.resolve("path-browserify") },
    },
  },
  devServer: {
    port: 8080 // 此处修改你想要的端口号
  }
})

