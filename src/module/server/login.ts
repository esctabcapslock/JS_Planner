import {Server, addon} from "httptree"
import { IncomingMessage, ServerResponse } from "http";
import { login, session } from "../service/login/"
import { thisProgramPath } from "../const";
import { _302, _403 } from "./server_fn";
import querystring = require('querystring');
import { SessionData } from "../service/login/session";



const loginServer = new Server<string>(
    undefined,
    {payloadMaxSize:1024*1024} // 1MB 입력 재한
)
const $auth = loginServer.p('a').p('auth')


loginServer.p('login').get((req,res,sessionKey)=>{
    console.log('log-in')
    res.sendFile(thisProgramPath+'\\public\\static\\login.html')
})

loginServer.p('signup').get((req,res,sessionKey)=>{
    console.log('signup')
    res.sendFile(thisProgramPath+'\\public\\static\\signup.html')
})


$auth.p('login').post(async (req,res,sessionKey)=>{
    console.log('login-post')
    const {email, pw} = querystring.parse(req.body('string'))
    console.log('login - post', {email, pw})
    if(await login.login(email.toString(),pw.toString(), sessionKey)){ // 로그인 성공
        console.log('로그인 관련')
        res.statusCode = 302
        res.setHeader('Location','/')
        res.send('')
    }else{
        // 로그인 실패
        res.statusCode = 403
        res.setHeader('Content-Type','text/html; charset=utf-8') 
        res.send('<script>alert("Login failed"); location="/login"</script>')
    }
    
})

$auth.p('signup').post(async (req,res,sessionKey)=>{
    const {email, pw} = querystring.parse(req.body('string'))
    console.log('[signup]')
    if(typeof email != 'string') return res.throw(400, "잘못된 email 유형",true)
    if(typeof pw != 'string') return res.throw(400, "잘못된 pw 유형",true)

    if(await login.signup(email, pw, sessionKey)){
        // TODO 이메일 인증 만들기
        console.log('성공')
        res.statusCode = 302
        res.setHeader('Location','/login')
        res.send('')
    }else{
        res.statusCode = 400
        res.setHeader('Content-Type','text/html; charset=utf-8') 
        res.send('<script>alert("Signup failed"); location="/signup"</script>')
    }
})

// $auth.p('addinfo').post((req,res,obj)=>{
//     const {email, pw} = req.body('json')
// })


// 로그인서버로 보내는 트래픽의 경우. 로그인서버에서 논리 처리가 종결되어야 한다.
async function loginServer_preParse(req:IncomingMessage,res:ServerResponse, sessionData:string):Promise<true>{
    if(await loginServer.parse(req,res,sessionData)) return true
    
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
export const loginServerParse = async (req:IncomingMessage,res:ServerResponse)=>{
    const cookie = addon.parseCookie(req.headers['cookie'])
    const sessionRawData = cookie['session']

    // 세전 정보가 없으므로 세션 정보를 추가합니다.
    if(!sessionRawData) {
        const newSession = session.new()
        res.setHeader('Set-Cookie', [`session=${newSession}; Max-Age=${session.maxAge}; SameSite=Strict; HttpOnly; `])
        return await loginServer_preParse(req,res, newSession)
    }
    
    
    // 로그인 여부를 확인합니다.
    const session_parsed = session.parse(sessionRawData)

    // 세션 정보를 받아오는데 실패한 경우입니다.
    if(session_parsed==null){
        console.error('세션 정보를 받아오는데 실패')
        const newSession = session.new()
        res.setHeader('Set-Cookie', [`session=${newSession}; Max-Age=${session.maxAge}; SameSite=Strict; HttpOnly; `])
        return await loginServer_preParse(req,res, newSession)
    }

    // 아직 로그인하지 않은 경우입니다.
    if(session_parsed.login===null)  return await loginServer_preParse(req,res,sessionRawData)
    
    // 로그인한 경우입니다.
    else return session_parsed.login
    
}