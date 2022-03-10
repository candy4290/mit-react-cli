const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/qinwu-api', {
      target: 'http://172.20.62.117:28080',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/qinwu-api': '',
      },
    })
  );
};
