const { createProxyMiddleware } = require("http-proxy-middleware");
const { clusterUrl } = require("./config");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: clusterUrl,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/", // remove base path
      },
    })
  );
};
