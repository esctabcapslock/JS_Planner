import sql from "../load"
import ProcessData from "./dto"

class ProcessDB{
    constructor(){

    }

    async add(process:ProcessData){
        const o = await sql`INSERT INTO process ${sql(
            process.toEntity()
        )}`
        return o
    }

    async edit(process:ProcessData){
        const o = sql`UPDATE process set ${sql(
            process.toEntity()
        )} WHERE id=${process.id}`
        return o
    }
    async delete(processId:number){
        const o =  await sql`DELETE FROM process where id=${processId}`
        return o
    }

    async findAll(){
        const o =  await sql`SELECT * FROM process`
        return o
    }

    async findById(processId:number){
        const o =  await sql`SELECT * FROM process where id=${processId}`
        return o
    }
}

export default new ProcessDB()