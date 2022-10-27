
import * as HTTP from "http"
import { serviceServer } from "./service";
import { staticServer } from "./static";
import { _404, _4xx } from "./server_fn"
import { loginParse } from "./login"

const port = 80;
// console.log('process.env',process.env, process.argv)

export const httpserver = HTTP.createServer(async (req: HTTP.IncomingMessage, res: HTTP.ServerResponse) => {
    const url: string | undefined = req.url;
    if(url.length>1024) return _4xx(414,res,'URI Too Long'); 
    const method: string | undefined = req.method;
    const url_arr: string[] = typeof (url) == 'string' ? url.split('/') : []
    console.log('['+method+']','[url]', url, url_arr)
    
    if(staticServer.parse(req,res,undefined)) return


    let login=undefined;
    if(process.argv.includes('-dev')){ // 개발용. 로그인 안함/
        login = {userID:1}
    }else{ // 실제 커밋용. 로그인 해야함
        login = loginParse(req,res)
        console.log('logpas - after', login)
        if(login==true) return
    }
    
    if(serviceServer.parse(req,res,{userID:login.userID})) return

    _404(res,url,' not allowed')

}).listen(port, () => console.log(`server is running at localhost:${port}`))