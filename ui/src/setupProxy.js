const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware(["/api/**", "/oauth2/**"],
         {
             target: 'http://localhost:8080/',
             headers: {
                 "Connection": "keep-alive"
             }
         }
    ));
    app.use(createProxyMiddleware(["/login"],
        {
            target: 'http://localhost:8080/',
            headers: {
                "Connection": "keep-alive"
            }
        }
    ));
}