const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/users',
    createProxyMiddleware({
      target: 'https://apimanagement-nest-js.onrender.com',
      changeOrigin: true,
    }),
  )

  app.use(
    '/api-monitors',
    createProxyMiddleware({
      target: 'https://apimanagement-nest-js.onrender.com',
      changeOrigin: true,
    }),
  )
}
