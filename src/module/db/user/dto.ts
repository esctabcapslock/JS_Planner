import { type } from "os"
import { emailRegexp } from "../../const"
import { mustNatNumN, mustNatNum, mustStr, mustStrN, mustBool, mustUnixDateNum, mustUnixDateNumN, mustDateOrUnixDateNumN, mustDateOrUnixDateNum } from "../../mustBe"

export default class UserData {
    constructor(
        public id: number|null,
        public email: string,
        public pw: string,
        public sign_date:Date,
        public last_login:Date|null = null,
        public timezone:number|null = null,
    ) {
        if(!emailRegexp.test(email)) throw('email 형식이 아님')
    }

    static new(
        data: {
            id?: any;
            email?: any;
            pw?: any;
            sign_date?: any;
            last_login?: any;
            timezone?: any;
        }
    ) {
        return new UserData(
            mustNatNumN(data.id),
            mustStr(data.email),
            mustStr(data.pw),
            mustDateOrUnixDateNum(data.sign_date),
            mustDateOrUnixDateNumN(data.last_login),
            mustNatNumN(data.timezone),
        )
    }

    toEntity():dataEntity{
        return {
            id : this.id,
            email : this.email,
            pw : this.pw,
            sign_date: this.sign_date,
            last_login: this.last_login,
            timezone: this.timezone,            
        }
    }

    toAddEntity():dataEntity{
        return {
            email : this.email,
            pw : this.pw,
            sign_date: this.sign_date,     
        }
    }
}


export type dataEntity = {
    id?: number;
    email?: string;
    pw?: string;
    sign_date?: Date;
    last_login?: Date|null;
    timezone?: number|null;
}

