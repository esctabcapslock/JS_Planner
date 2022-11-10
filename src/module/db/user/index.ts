import { type } from "os"
import { PostgresError } from "postgres"
import { mustInt } from "../../mustBe"
import sql from "../load"
import UserData, { dataEntity } from "./dto"



class UserDB{
    constructor(){
    }

    async add(user:UserData):Promise<number>{
        try{
            const o = await sql`INSERT INTO users ${sql(
                user.toAddEntity()
            )}` // new Result(0) [] 
            const oo = this.findByEmailAndPw(user.email, user.pw)
            return mustInt(oo[0].id)
        }
        catch(e){
            // 중복된 이메일. 알림 메일 전송했다고 똑같이 안내하기. 가입되었다는 사실 숨기기
            if(
                e instanceof PostgresError && 
                e.message === "duplicate key value violates unique constraint \"users_email_key\""
                ) {
                return -1
            }else{
                // 
                throw(e)
            }
        }
        
        
    }

    async edit(userId:number, updateData: dataEntity){
        const o = await sql`UPDATE users set ${sql(
            updateData,
        )} WHERE id=${userId}`
        console.log('[UserDB edit]',updateData,o)
        // return (await o).map(e=>UserData.new(e))
    }
    async delete(UserId:number){
        const o =  await sql`DELETE FROM users where id=${UserId}`
        console.log('[delete]',o)
        return o
    }

    async findAll(){
        const o =  await sql`SELECT * FROM users`
        console.log('[findAll]',o)
        return o.map(d=>UserData.new(d))
    }

    async findById(userId:number):Promise<UserData|null>{
        const o =  await sql`SELECT * FROM users where id=${userId}`
        if(o.length>1) throw("중복된 가입자")
        else if(o.length<1) return null
        return UserData.new(o[0])
    }

    async findByEmailAndPw(email:string, pw:string):Promise<false|UserData>{
        const o = await sql`SELECT * from users where email=${email} and pw=${pw}`
        console.log('[findByEmailAndPw]',o)
        if(o.length>1) throw("중복된 가입자")
        if(o.length<1) return false
        return UserData.new(o[0])
    }
}

export default new UserDB()