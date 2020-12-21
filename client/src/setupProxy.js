

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    ["/api","/user"],
    createProxyMiddleware({
      target: 'http://localhost:5000',
      
    }),
    
  );
};
//
//changeOrigin: true, 
////secure: false,
//onProxyRes: function (proxyRes, req, res) {
//   proxyRes.headers['Access-Control-Allow-Origin'] = '*';