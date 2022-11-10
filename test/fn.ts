import * as http from "http"
import { off } from "process"
import { BgGreen, FgGreen, FgRed, Reset } from "./color"
const host = 'http://localhost'
export function request(url:string, method:"GET"|"POST"|"PUT"|"PATCH"|"DELETE", cookie:string = '', body:string|null = null): Promise<{res:http.IncomingMessage, body:string}>{
    return new Promise(
        (resolve, reject)=>{
            const option:http.RequestOptions = {
                method,
                headers:{
                    cookie:cookie,
                },
            }
            

            const req = http.request(host+url,option,(res)=>{

                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    return resolve({res:res, body:rawData})
                })
            })

            

            req.on('error', (e) => {
                console.error(`problem with request: ${e.message}`);
                reject('llllllll')
              });

            if(method!=='GET' && body!=null){
                req.write(body);
            }
            req.end();
              
              // Write data to request body
              
        }
    )
}

let cnt = 0

export function test(name:string='', d1:any, d2:any){
    const [e1,e2] = [JSON.stringify(d1), JSON.stringify(d2)]
    if(e1==e2){
        console.log(`${FgGreen}[TEST ${cnt++}]${Reset} ${name} ${FgGreen}pass${Reset}, value=`,d1)
    }else{
        console.log(`${FgRed}[TEST ${cnt++}]${Reset} ${name} ${FgRed}false${Reset}, value=`,d1,d2)
    }
}