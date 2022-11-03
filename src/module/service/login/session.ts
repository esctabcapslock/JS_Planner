import {createHash} from 'crypto';
const SHA256 = (txt:string)=> createHash('sha256').update(txt).digest('base64url'); // 너무 긴가? md5만 할까?

export class Session<data>{
    private sessionDict:{[key:string]:SessionData}
    private salt:string
    public maxAge:number
    /**
     * 
     * @param salt salt로 쓸 문자열
     * @param maxAge 유효시간. 단위는 초
     */
    constructor(salt:string, maxAge:number=3600){
        this.salt = salt+(Math.random()).toString(16)
        this.sessionDict = {}
        this.maxAge = maxAge
    }


    /**
     * 세션 문자열을 갖고 저장된 데이터를 가져옵니다.
     * 
     * 없는 경우 에러를 발생시킵니다.
     * @param sessionStr 세션 문자열
     */
    parse(sessionStr:string):SessionData|null{
        if (!this.sessionDict[sessionStr]) {
            console.error('존재X 요청')
            return null
        }
        if(this.sessionDict[sessionStr].maxAge < new Date()) {
            console.error('기한 만료된 세션 요청')
            return null
        }
        return this.sessionDict[sessionStr]
    }

    /**
     * 새로운 세션 값을 만듦니다
     */
    new():string{
        let str = SHA256(this.salt+Math.random().toString()+(new Date()))
        while (str in this.sessionDict) str = SHA256(this.salt+Math.random().toString()+(new Date()))

        const data = {
            login:null,
            maxAge:new Date(Date.now()+this.maxAge*1000)
        }
        this.sessionDict[str] = data

        return str
    }


    /**
     * 세션에 저장된 정보를 변경합니다. 
     */
    changeLoginData(key:string, data:null|SessionLoginData){
        if(!this.sessionDict[key]) throw('존재하지 않는 key')
        this.sessionDict[key].login = data
    }

    /**
     * 기한이 지난 세션을 삭제합니다.
     */
    delOverMaxAge(){
        for(const key in this.sessionDict){
            if(this.sessionDict[key].maxAge < new Date()) delete this.sessionDict[key]
        }
    }

    // TODO 만료 직전에 세션 자동 갱신
}

export interface SessionData {
    login: null | SessionLoginData
    maxAge:Date
}

interface SessionLoginData{
    userID: number,
}