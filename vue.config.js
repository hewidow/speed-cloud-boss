module.exports = {
  publicPath: '/',
  outputDir: 'admin',
  assetsDir: 'static',
  devServer: {
    proxy: { // 使用nginx
      '/api': {
        target: 'http://127.0.0.1',
        changOrigin: true
      }
    }
  }
}
