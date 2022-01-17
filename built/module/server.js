"use strict";
exports.__esModule = true;
var HTTP = require("http");
//tsc --target "es6" --module "commonjs"  module/server.ts
var port = 80;
function POST(req, res, callback) {
    var data = [];
    req.on('error', function () { callback(res, undefined); });
    req.on('data', function (chunk) { data.push(chunk); });
    req.on('end', function () { console.log('pposost', data); callback(res, Buffer.concat(data)); });
    return undefined;
}
function _404(res, url, err) {
    if (err)
        console.error('_404 fn err', url, err);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('404 Page Not Found');
}
var httpserver = HTTP.createServer(function (req, res) {
    var url = req.url;
    var method = req.method;
    var url_arr = typeof (url) == 'string' ? url.split('/') : [];
    console.log('[url]', url, url_arr);
}).listen(port, function () { return console.log("server is running at localhost:" + port); });
