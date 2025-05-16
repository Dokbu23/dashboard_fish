const { defineConfig } = require('@vue/cli-service')
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.plugins.push(new VuetifyPlugin())
  }
})