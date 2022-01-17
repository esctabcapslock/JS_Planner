import * as HTTP from "http"
//tsc --target "es6" --module "commonjs"  module/server.ts
const port:number = 80;


function POST(req: any, res: any, callback: ((res: any, buffer: Buffer | undefined) => void)) {
const data: Buffer[] = [];
req.on('error', () => { callback(res, undefined) });
req.on('data', (chunk: Buffer) => { data.push(chunk) });
req.on('end', () => { console.log('pposost', data); callback(res, Buffer.concat(data)) });
return undefined;
}

function _404(res: any, url: String | void, err: String) {
if (err) console.error('_404 fn err', url, err)
res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
res.end('404 Page Not Found');
}


const httpserver = HTTP.createServer((req, res) => {
const url: string | undefined = req.url;
const method: string | undefined = req.method;
const url_arr: string[] = typeof (url) == 'string' ? url.split('/') : []

console.log('[url]', url, url_arr)

}).listen(port, () => console.log(`server is running at localhost:${port}`))


