import {Session, SessionData} from './session'
class Login{
    constructor(){

    }

    login(email:string,pw:string, sessionKey:string):boolean{
        console.table({email,pw})
        //개발용 대충
        if (email=='admin@ew' && pw=='53477f3613ddd4645bd785b71c074510faba153742211327b424226132cae04ff32a329fe0b7f67753a581136f574f62174a95874444302c0c3d3b54e5c47d61'){
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