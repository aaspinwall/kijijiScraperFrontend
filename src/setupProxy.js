const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/walkscore", {
      target: "http://localhost:8888/.netlify/functions/hello",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/walk", {
      target:
        "https://sharp-clarke-8f329a.netlify.app/.netlify/functions/hello",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/search", {
      target: "http://localhost:5000/search",
    })
  );
};
