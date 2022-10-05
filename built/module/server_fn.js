"use strict";
exports.__esModule = true;
exports._404 = exports.POST = exports.sendfile = void 0;
var fs = require("fs");
function sendfile(res, url, encode, file_type, range) {
    return new Promise(function (resolve) {
        console.log('sendfile', url);
        var name = url.toString().split('/').reverse()[0];
        if (name.endsWith('.html'))
            file_type = 'text/html; charset=utf-8';
        if (name.endsWith('.css'))
            file_type = 'text/css; charset=utf-8';
        if (name.endsWith('.js'))
            file_type = 'text/javascript; charset=utf-8';
        if (name.endsWith('.png')) {
            encode = '';
            file_type = 'image/png';
        }
        if (name.endsWith('.ts')) {
            encode = '';
            file_type = 'application/octet-stream';
        }
        fs.stat(url, function (err, stats) {
            if (err)
                _404(res, url, '[error] fs_file_not_exist');
            else if (encode == 'utf8') { //택스트 파일인 경우
                res.writeHead(200, { 'Content-Type': file_type });
                res.end(fs.readFileSync(url, encode));
            }
            else { //바이너리 파일인 경우
                var parts = range == undefined ? undefined : range.replace(/bytes=/, "").replace(/\/([0-9|*]+)$/, '').split("-").map(function (v) { return parseInt(v); });
                if (!parts || parts.length != 2 || isNaN(parts[0]) || parts[0] < 0) {
                    res.writeHead(200, {
                        'Content-Type': file_type,
                        'Content-Length': stats.size,
                        'Accept-Ranges': 'bytes',
                        'Cache-Control': 'max-age=3600'
                    });
                    var readStream = fs.createReadStream(url);
                    readStream.pipe(res);
                }
                else {
                    var start = parts[0];
                    var MAX_CHUNK_SIZE = 1024 * 1024 * 8;
                    var end = Math.min((parts[1] < stats.size - 1) ? parts[1] : stats.size - 1, start + MAX_CHUNK_SIZE - 1);
                    console.log('[file-분할전송 - else]', start, end, '크기:', stats.size, parts);
                    var readStream = fs.createReadStream(url, { start: start, end: end });
                    res.writeHead((end == stats.size) ? 206 : 206, {
                        'Content-Type': file_type,
                        'Accept-Ranges': 'bytes',
                        'Content-Range': "bytes ".concat(start, "-").concat(end, "/").concat(stats.size),
                        'Content-Length': end - start + 1
                    });
                    readStream.pipe(res);
                }
            }
            resolve();
        });
    });
}
exports.sendfile = sendfile;
function POST(req, res, callback) {
    var data = [];
    req.on('error', function () { callback(res, undefined); });
    req.on('data', function (chunk) { data.push(chunk); });
    req.on('end', function () { console.log('pposost', data); callback(res, Buffer.concat(data)); });
    return undefined;
}
exports.POST = POST;
function _404(res, url, err) {
    if (err)
        console.error('_404 fn err', url, err);
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('404 Page Not Found');
}
exports._404 = _404;
