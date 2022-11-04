import {Session, SessionData} from './session'
import userDB from '../../db/user'
import UserData from '../../db/user/dto'
import pwEncoder from './pwEncoder'
import { emailRegexp } from '../../const'
import { mustInt } from '../../mustBe'

class Login{
    constructor(){

    }

    async login(email:string,pw:string, sessionKey:string):Promise<boolean>{
        console.table({email,pw})
        //개발용 대충

        const o = await userDB.findByEmailAndPw(email,pwEncoder(pw))
        // 실패한 경우
        if(o == false) return false
        session.changeLoginData(sessionKey,{userID:o.id})
        console.log('[last_login]',o.last_login)
        const oo = userDB.edit(mustInt(o.id), {last_login:new Date()})
        return true

        // if (email=='admin@ew' && pw=='U0d_NhPd1GRb14W3HAdFEPq6FTdCIRMntCQiYTLK4E_zKjKf4Lf2d1OlgRNvV09iF0qVh0REMCwMPTtU5cR9YQ'){
        //     // sessionData.login = {userID:1}
            
        //     // console.log('ok')
        //     session.changeLoginData(sessionKey,{userID:1})
        //     return true
        // }else{
            
        //     return false
        // }
    }

    async signup(email:string, pw:string, sessionKey:string):Promise<boolean>{
        console.log('[service > Login] signup')
        if(!emailRegexp.test(email)) return false // 이메일 형식 맞지 않음
        if(pw.length !== 86) return false // 비번 형식 맞지 않음
        
        const o = await userDB.add(
            new UserData(null, email, pwEncoder(pw), new Date())
        )

        // TODO: 알림 메일 전송했다고 똑같이 안내하기. 가입되었다는 사실 숨기기. 일단은 로그인 페이지로 이동시키기.
        
        return true
    }

    async delete(userId:number){
        // TODO 회원 탈퇴 기능 만들기
        userDB.delete(userId)

    }

    async setTimezone(userId:number){

    }
}

export const login = new Login()
export const session = new Session('login_session', 3600)