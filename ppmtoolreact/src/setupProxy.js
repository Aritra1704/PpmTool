const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};

// For prod
// target: "https://blooming-ocean-11204.herokuapp.com/",
// For localhost
// target: "http://localhost:8080",