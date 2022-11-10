import sql from "../load"
import TaskData from "./dto"

class TaskDB{
    constructor(){

    }

    async add(task:TaskData){
        const o = await sql`INSERT INTO task ${sql(
            task.toEntity()
        )}`
        return o
    }

    async edit(task:TaskData){
        const o = sql`UPDATE INTO task ${sql(
            task, 'name'
        )} WHERE id=${task.id}`
        return o
    }
    async delete(taskId:number){
        const o =  await sql`DELETE FROM task where id=${taskId}`
        return o
    }

    async findAll(){
        const o =  await sql`SELECT * FROM task`
        return o
    }

    async findById(taskId:number){
        const o =  await sql`SELECT * FROM task where id=${taskId}`
        return o
    }
}

export default new TaskDB()