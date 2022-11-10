import taskDB from '../db/task'
import TaskData from '../db/task/dto'
import { mustNatNum, mustStr } from '../mustBe'

class TaskService{
    constructor(){

    }

    async add(userId:number, body:string):Promise<{id:number}>{
        const o = await taskDB.add(
            new TaskData(null, userId, body)
        )
        return o
    }

    async getById(userId:number, taskId:number):Promise<TaskData>{
        const o = await taskDB.findById(userId, taskId)
        return o
    }

    async get(userId:number):Promise<TaskData[]>{
        const o = await taskDB.findAll(userId)
        return o
    }

    async edit(userId:number, taskId:number, req:any){
        const body = mustStr(req.body)
        const o = await taskDB.edit(
            userId, taskId,
            (new TaskData(taskId, userId, body))
        )
        return true
    }

    async delete(userId:number,taskId:number, req:any){
        const o = await taskDB.delete(userId, taskId)
        return true
    }
}

export default new TaskService()