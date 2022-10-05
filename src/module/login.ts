import {Server, addon} from "httptree"
import { IncomingMessage, ServerResponse } from "http";
import {createCipheriv,createDecipheriv,createHash} from 'crypto';
const SHA512 = (txt:string)=> createHash('sha256').update(txt).digest('hex');


class Session<data>{
    private sessionDict:{[key:string]:SessionData}
    private salt:string
    public maxAge:number
    constructor(salt:string, maxAge:number=3600){
        this.salt = salt
        this.sessionDict = {}
        this.maxAge = maxAge
    }

    parse(sessionStr){
        if (!this.sessionDict[sessionStr]) throw('존재X')
        
        if(this.sessionDict[sessionStr].maxAge < new Date()) throw('기한 만료')

        return this.sessionDict[sessionStr]
    }

    new():string{
        let str = SHA512(this.salt+Math.random().toString()+(new Date()))
        while (str in this.sessionDict) str = SHA512(this.salt+Math.random().toString()+(new Date()))

        const data = {
            login:null,
            maxAge:new Date(Date.now()+this.maxAge*1000)
        }
        this.sessionDict[str] = data

        return str
        
    }

    delOverMaxAge(){
        for(const key in this.sessionDict){
            if(this.sessionDict[key].maxAge < new Date()) delete this.sessionDict[key]
        }
    }
}

interface SessionData {
    login: null | {
        userID: number,
    }
    maxAge:Date
}

const session = new Session('qwer')
const loginHp = new Server()
const $auth = loginHp.p('a').p('auth')

$auth.p('login').post((req,res,obj)=>{
    const {email, pw} = req.body('json')
})

$auth.p('signup').post((req,res,obj)=>{
    const {email, pw} = req.body('json')
})

$auth.p('addinfo').post((req,res,obj)=>{
    const {email, pw} = req.body('json')
})

export const loginParse = (req:IncomingMessage,res:ServerResponse)=>{
    const cookie = addon.parseCookie(req.headers['cookie'])
    const sessionRawData = cookie['session']
    console.log('loginParse')
    try{
        if(!sessionRawData) throw('존재X임')
        const {login} = session.parse(sessionRawData)
        if(login===null) return loginHp.parse(req,res,undefined)
        else return login
    }catch{
        res.setHeader('Set-Cookie', [`session=${session.new()}; Max-Age=${session.maxAge}; SameSite=Strict; HttpOnly; `])
        return loginHp.parse(req,res,undefined)
    }
}