const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/search", {
      target: "https://limitless-cove-26677.herokuapp.com/search",
    })
  );
};
