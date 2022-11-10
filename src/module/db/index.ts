import sql from "./load"
export default sql




/*


type Rest<T> = 
    T extends string[] ? readonly string:
    any



abstract class myDatatype<T extends {[key:string]:any}>{
    public id:number
    constructor(
        req:T
    ){
        this.id = mustInt(req.id)
    }

    static new(obj:{[keys in keyof T]: any}):myDatatype<T>{
        
    }
    // 정적 멤버는 클래스 형식 매개 변수를 참조할 수 없습니다. 이게 문제임!!

    public abstract toEntity():{[types in keyof T]: T[types]}
}


abstract class myDB<T, datatype extends myDatatype<T>>{
    constructor(
        public tableName:string,
    ){}

    async add(data:datatype){
        
        const o = await sql`UPDATE INTO ${this.tableName} ${sql(
            data.toEntity()
        )} WHERE id=${data.id}`
        return o
    }
}


type h = {
    "ddd":number,
    "fff":Date
}
// class tmpDatatype extends myDatatype<h>{
//     public toEntity(): { ddd: number; fff: Date } {
        
//     }
// }

const k = myDatatype.new()

*/