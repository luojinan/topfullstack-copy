// vue.config.js
module.exports = {
  devServer: {
    port: '',
    proxy: {
      '/apis': {
        target: 'http://localhost:3000/', // target host
        ws: true, // proxy websockets 
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/apis': '' // rewrite path
        }
      },
    }
  }
};