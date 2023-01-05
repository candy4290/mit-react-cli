const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/jiadingqinwu-api', {
      target: 'http://172.20.62.117:47070',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/jiadingqinwu-api': '',
      },
    })
  );
  //   qinwu-api
  // eslint-disable-next-line no-unused-expressions
  app.use(
    createProxyMiddleware('/prod-api', {
      target: 'http://172.20.62.117:48080',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/prod-api': '',
      },
    })
  ),
    app.use(
      createProxyMiddleware('/keyikao-api', {
        target: 'http://172.20.62.117:45678',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/keyikao-api': '',
        },
      })
    );
};
