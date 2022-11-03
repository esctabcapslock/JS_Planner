import {Session, SessionData} from './session'
class Login{
    constructor(){

    }

    login(email:string,pw:string, sessionKey:string):boolean{
        console.table({email,pw})
        //개발용 대충
        if (email=='admin@ew' && pw=='U0d_NhPd1GRb14W3HAdFEPq6FTdCIRMntCQiYTLK4E_zKjKf4Lf2d1OlgRNvV09iF0qVh0REMCwMPTtU5cR9YQ'){
            // sessionData.login = {userID:1}
            
            // console.log('ok')
            session.changeLoginData(sessionKey,{userID:1})
            return true
        }else{
            return false
        }
    }
}

export const login = new Login()
export const session = new Session('login_session', 3600)