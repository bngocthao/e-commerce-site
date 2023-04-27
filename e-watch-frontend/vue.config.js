const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://localhost:8000",
  }
})

// module.exports = {
//   devServer = {
//     // tell front end that each request comes from this origin is the same as front end
//     proxy: 'http://localhost:8000'
//   }
// }