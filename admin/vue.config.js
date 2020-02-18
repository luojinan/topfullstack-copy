// vue.config.js
module.exports = {
  devServer: {
    port: '',
    proxy: {
      '/apis': {
        // target: 'http://localhost:3000/', // target host
        target: 'http://134.175.187.48:3000/', // target host
        ws: true, // proxy websockets 
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/apis': '' // rewrite path
        }
      },
    }
  }
};