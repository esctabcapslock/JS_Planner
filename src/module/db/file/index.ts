import sql from "../load"
import FileData from "./dto"

class FileDB{
    constructor(){

    }

    async add(file:FileData):Promise<number>{
        const o = await sql`INSERT INTO file ${sql(
            file.toAddEntity()
        )}`
        
        console.log('[FileDB add]',o)
        const oo = await this.findBySavename(file.user_id, file.save_name)
        return oo.id
    }

    async edit(file:FileData){
        const o = sql`UPDATE file set ${sql(
            file.toEntity()
        )} WHERE id=${file.id}`
        return o
    }
    async delete(fileId:number){
        const o =  await sql`DELETE FROM file where id=${fileId}`
        return o
    }

    async findAll(){
        const o =  await sql`SELECT * FROM file`
        return o
    }

    async findById(fileId:number){
        const o =  await sql`SELECT * FROM file where id=${fileId}`
        return o
    }

    async findBySavename(userId:number, save_name:string){
        const o =  await sql`SELECT * FROM file where user_id=${userId} AND save_name=${save_name}`
        if(o.length!==1) throw('길이 1 아님');

        return FileData.new(o[0])
    }
}

export default new FileDB()