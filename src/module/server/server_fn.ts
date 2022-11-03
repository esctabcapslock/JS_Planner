import * as HTTP from "http"
import * as fs from "fs"

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
