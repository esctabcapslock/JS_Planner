import * as HTTP from "http"
import * as fs from "fs"



export function sendfile(res:HTTP.ServerResponse, url:string, encode:string, file_type:string, range:undefined|string):Promise<void>{
    return new Promise(function (resolve:Function){
    console.log('sendfile', url)
    const name = url.toString().split('/').reverse()[0]
    if (name.endsWith('.html')) file_type = 'text/html; charset=utf-8';
    if (name.endsWith('.css')) file_type = 'text/css; charset=utf-8';
    if (name.endsWith('.js')) file_type = 'text/javascript; charset=utf-8';
    if (name.endsWith('.png')) { encode = ''; file_type = 'image/png'; }
    if (name.endsWith('.ts')) { encode = ''; file_type = 'application/octet-stream'; }

    fs.stat(url, (err, stats) => {
        if (err) _404(res, url, '[error] fs_file_not_exist');
        else if (encode == 'utf8') { //택스트 파일인 경우
            res.writeHead(200, { 'Content-Type': file_type }); res.end(fs.readFileSync(url, encode))
        } else { //바이너리 파일인 경우
            const parts:undefined|number[] = range == undefined ? undefined : range.replace(/bytes=/, "").replace(/\/([0-9|*]+)$/, '').split("-").map(v => parseInt(v));
            if (!parts || parts.length != 2 || isNaN(parts[0]) || parts[0] < 0) {
                res.writeHead(200, {
                    'Content-Type': file_type,
                    'Content-Length': stats.size,
                    'Accept-Ranges': 'bytes',
                    'Cache-Control': 'max-age=3600',//단위는 초
                });
                const readStream:fs.ReadStream = fs.createReadStream(url)
                readStream.pipe(res);
            } else {
                const start = parts[0];
                const MAX_CHUNK_SIZE = 1024 * 1024 * 8;
                const end = Math.min((parts[1] < stats.size - 1) ? parts[1] : stats.size - 1, start + MAX_CHUNK_SIZE - 1)
                console.log('[file-분할전송 - else]', start, end, '크기:', stats.size, parts);
                const readStream = fs.createReadStream(url, { start, end });
                res.writeHead((end == stats.size) ? 206 : 206, { //이어진다는 뜻
                    'Content-Type': file_type,
                    'Accept-Ranges': 'bytes',
                    'Content-Range': `bytes ${start}-${end}/${stats.size}`,
                    'Content-Length': end - start + 1,
                });
                readStream.pipe(res);
            }
        }
        resolve()
    })})
}

export function POST(req: HTTP.IncomingMessage, res: HTTP.ServerResponse, callback: ((res: HTTP.ServerResponse, buffer: Buffer | undefined) => void)) {
    const data: Buffer[] = [];
    req.on('error', () => { callback(res, undefined) });
    req.on('data', (chunk: Buffer) => { data.push(chunk) });
    req.on('end', () => { console.log('pposost', data); callback(res, Buffer.concat(data)) });
    return undefined;
}

export function _404(res: HTTP.ServerResponse, url: string | undefined, err: string|object) {
    if (err) console.error('_404 fn err', url, err)
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('404 Page Not Found');
} 
export function _403(res: HTTP.ServerResponse, url: string | undefined, err: string|object) {
    if (err) console.error('_403 fn err', url, err)
    res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(' 403 Forbidden');
} 

export function _302(res: HTTP.ServerResponse, path: string) {
    res.statusCode = 302
    res.setHeader('Location',path)
    res.end('302 Found')
} 

export function _4xx(statusCode:number ,res: HTTP.ServerResponse, msg: string) {
    res.statusCode = statusCode
    res.end(msg)
} 
