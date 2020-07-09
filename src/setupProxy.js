const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/search", {
      target: "http://localhost:5000/search",
    })
  );
};
