import {Server, addon} from "httptree"
import { IncomingMessage, ServerResponse } from "http";
import {Session} from "./session"
import { thisProgramPath } from "../const";
import { _302, _403 } from "./server_fn";
const querystring = require('querystring');


const session = new Session('login_session')
const loginServer = new Server()
const $auth = loginServer.p('a').p('auth')


loginServer.p('login').get((req,res,obj)=>{
    console.log('log-in')
    res.sendFile(thisProgramPath+'\\public\\static\\login.html')
})


$auth.p('login').post((req,res,obj)=>{
    const {email, pw} = querystring(req.body('string'))
    
})

$auth.p('signup').post((req,res,obj)=>{
    const {email, pw} = req.body('json')
})

$auth.p('addinfo').post((req,res,obj)=>{
    const {email, pw} = req.body('json')
})


// 로그인서버로 보내는 트래픽의 경우. 로그인서버에서 논리 처리가 종결되어야 한다.
function loginServer_preParse(req:IncomingMessage,res:ServerResponse):true{
    if(loginServer.parse(req,res,undefined)) return true
    
    // 메인 페이지 요청시 리다이렉트 시킵니다.
    else if(`${req.url}` == '/'){
        _302(res,'/login')
        return true
    }
    // 아니라면 리다이렉트 시킵니다.
    else{
        _403(res,req.url, '이상')
        return true
    }
}


// 로그인과 관련된 정보 처리
export const loginParse = (req:IncomingMessage,res:ServerResponse)=>{
    const cookie = addon.parseCookie(req.headers['cookie'])
    const sessionRawData = cookie['session']

    // 세전 정보가 없으므로 세션 정보를 추가합니다.
    if(!sessionRawData) {
        res.setHeader('Set-Cookie', [`session=${session.new()}; Max-Age=${session.maxAge}; SameSite=Strict; HttpOnly; `])
        return loginServer_preParse(req,res)
    }
    
    
    // 로그인 여부를 확인합니다.
    const session_parsed = session.parse(sessionRawData)

    // 세션 정보를 받아오는데 실패한 경우입니다.
    if(session_parsed==null){
        console.error('세션 정보를 받아오는데 실패')
        res.setHeader('Set-Cookie', [`session=${session.new()}; Max-Age=${session.maxAge}; SameSite=Strict; HttpOnly; `])
        return loginServer_preParse(req,res)
    }

    // 아직 로그인하지 않은 경우입니다.
    if(session_parsed.login===null)  return loginServer_preParse(req,res)
    
    // 로그인한 경우입니다.
    else return session_parsed.login
    
}