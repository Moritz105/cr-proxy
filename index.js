const http = require("http");
const https = require("https");

http.createServer((req, res) => {
  const options = {
    hostname: "api.clashroyale.com",
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: "api.clashroyale.com" }
  };
  const proxy = https.request(options, (apiRes) => {
    res.writeHead(apiRes.statusCode, apiRes.headers);
    apiRes.pipe(res);
  });
  req.pipe(proxy);
}).listen(process.env.PORT || 3000);