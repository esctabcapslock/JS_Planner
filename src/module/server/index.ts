
import * as HTTP from "http"
import { serviceServer } from "./service";
import { staticServer } from "./static";
import { _404 } from "./server_fn"
import { loginParse } from "./login"

const port = 80;

export const httpserver = HTTP.createServer(async (req: HTTP.IncomingMessage, res: HTTP.ServerResponse) => {
    const url: string | undefined = req.url;
    const method: string | undefined = req.method;
    const url_arr: string[] = typeof (url) == 'string' ? url.split('/') : []
    console.log('['+method+']','[url]', url, url_arr)
    
    if(staticServer.parse(req,res,undefined)) return

    // 실제 서비스용
    // -----------
    /*
    const login = loginParse(req,res)
    console.log('logpas - after', login)
    if(login==true) return


    */
   // ---------
   
   // teset용
   const login = {userID:1}


   if(serviceServer.parse(req,res,{userID:login.userID})) return //_404(res,'dd','err!!')
    


    _404(res,url,' not allowed')

}).listen(port, () => console.log(`server is running at localhost:${port}`))