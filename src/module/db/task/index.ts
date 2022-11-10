import { ReqError } from "../../error"
import { mustNatNum } from "../../mustBe"
import sql from "../load"
import TaskData from "./dto"

class TaskDB{
    constructor(){

    }

    async add(task:TaskData):Promise<{id:number}>{
        console.log('[TaskDB add]')
        const o = await sql`INSERT INTO task ${sql(
            task.toAddEntity()
        )} RETURNING id`
        console.log('[TaskDB add]',o)
        return {id:mustNatNum(o[0].id)}
    }

    async edit(userId:number, taskId:number, task:TaskData){
        const o = sql`UPDATE task set ${sql(
            task, 'body'
        )} WHERE id=${taskId} AND user_id=${userId}`
        return o
    }
    async delete(userId:number, taskId:number){
        const o =  await sql`DELETE FROM task where id=${taskId} AND user_id=${userId}`
        console.log('[TaskDB delete]',o)
        return o
    }

    async findAll(userId:number){
        const o =  await sql`SELECT * FROM task where user_id=${userId}`
        return o.map(v=>TaskData.new(v))
    }

    async findById(userId:number, taskId:number){
        const o =  await sql`SELECT * FROM task where id=${taskId} AND user_id=${userId}`
        console.log('[TaskDB findById]',o)
        if(o.length == 0) throw(new ReqError("존재하지 않는 id", true, 404))
        if(o.length !== 1) throw(new ReqError("중복된 task", true, 500))
        return TaskData.new(o[0])
    }
}

export default new TaskDB()