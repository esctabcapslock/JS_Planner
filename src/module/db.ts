import * as fs from "fs"
import * as sqlite3 from "sqlite3"

function isInt(value:any):boolean {
    if (isNaN(value)) return false;
    if (typeof(value) != "number") return false;
    if (isNaN(parseInt(''+value, 10))) return false;
    return parseInt(''+value,10)==value      
}

//SQL에 넣기 위해, 객체 앞에 $들을 붙인다.
function toSQLobj(obj:object, deleteid:string[]|undefined):object{
    const new_obj:object = {};
    for (const i in obj) if(!deleteid || !deleteid.includes(i)){
        new_obj['$'+i] = Array.isArray(obj[i])?obj[i].join(','):obj[i]
    }
    console.log(new_obj)
    return new_obj
}

export interface Task{
    id:number|null,
    name:string,
    type:string|null
}

export function interfaceOfTask(obj:object):obj is Task {
    for (const key in obj){
        //console.log('[key],',key, typeof key, ['id', 'name','type'].includes(key))
        //console.log(typeof obj[key] != 'number',obj[key]!=null )
        if (!(['id', 'name','type'].includes(key))) return false;
        switch(key){
            case 'id': if(typeof obj[key] != 'number' && obj[key]!=null) return false; break;
            case 'name': if(typeof obj[key] != 'string') return false; break;
            case 'type': if(typeof obj[key] != 'string' && obj[key]!=null) return false; break;
        }
    }
    return true
}

export interface Process{
    id:number|null,
    name:string,
    startdate:number,
    enddate:number|null,
    starttime:number|null,
    endtime:number|null,
    taskid:number,
    memoid:number[],
    ended:number, //0이면 안끝남. 1이어야 끝남
}

export function interfaceOfProcess(obj:object):obj is Process {
    for (const key in obj){
        if (!(['id', 'name','startdate', 'enddate','starttime','endtime','taskid','memoid','ended'].includes(key))) return false;
        switch(key){
            case 'id': if(typeof obj[key] != 'number' && obj[key]!=null) return false; break;
            case 'name': if(typeof obj[key] != 'string') return false; break;
            case 'startdate': if(typeof obj[key] != 'number') return false; break;
            case 'enddate': if(typeof obj[key] != 'number' && obj[key]!=null) return false; break;
            case 'starttime': if(typeof obj[key] != 'number' && obj[key]!=null) return false; break;
            case 'endtime': if(typeof obj[key] != 'number' && obj[key]!=null) return false; break;
            case 'taskid': if(typeof obj[key] != 'number') return false; break;
            case 'memoid': if( !Array.isArray(obj[key])) return false; break;
            case 'ended': if(typeof obj[key] != 'number') return false; break;
        }
    }
    return true
}
interface Memo{
    id:number|null,
    taskid:number,
    processid:number|null,
    type:string|null,
}

export function interfaceOfMemo(obj:object):obj is Memo {
    for (const key in obj){
        if (!(['id', 'taskid','processid', 'type'].includes(key))) return false;
        switch(key){
            case 'id': if(typeof obj[key] != 'number' && obj[key]!=null) return false; break;
            case 'taskid': if(typeof obj[key] != 'number') return false; break;
            case 'processid': if(typeof obj[key] != 'number' && obj[key]!=null) return false; break;
            case 'name': if(typeof obj[key] != 'string') return false; break;
        }
    }
    return true
}

abstract class myDB{
    db:sqlite3.Database
    filename:string
    dbdirpath:string = `${__dirname}\\..\\..\\db` //db가 저장된 파일위치
    dbpath:string
    abstract setting():Promise<void>
    constructor(_filename:string){
        this.filename = _filename
        this.dbpath = `${this.dbdirpath}\\${this.filename}.sqlite`
        if(!fs.existsSync(this.dbdirpath)) fs.mkdirSync(this.dbdirpath);
        this.db = new sqlite3.Database(this.dbpath)
        this.setting();
    }
    public async isnone():Promise<boolean>{ //비어있는지 확인하는 함수
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function) {
            this_db.all("select name from sqlite_master where type='table'",  (err, tables)=>{
                resolve(!tables.length)
            });
        })
    }
    //잡다한 매소들에서, 실행하기 전 확인하는 용도
    public async exist():Promise<boolean>{
        if(!fs.existsSync(this.dbdirpath)) fs.mkdirSync(this.dbdirpath);
        if(!fs.existsSync(this.dbpath)) return false;
        if (!this.db) this.db = new sqlite3.Database(this.dbpath)
        if(await this.isnone()) await this.setting();
        return true
    }
}

class TaskDB extends myDB{
    //name = "task"
    async setting(): Promise<void> {
        if(!this.db || !(await this.isnone())) return;
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function) {
        this_db.serialize(()=>{
            this_db.run("CREATE TABLE task (\
                id integer primary key autoincrement,\
                name TEXT NOT NULL UNIQUE,\
                type TEXT\
                );")
    
            this_db.run("CREATE TABLE process (\
                id integer primary key autoincrement,\
                name TEXT NOT NULL,\
                startdate DATETIME NOT NULL,\
                enddate DATETIME,\
                starttime DATETIME,\
                endtime DATETIME,\
                taskid integer NOT NULL,\
                memoid TEXT,\
                ended integer NOT NULL\
                );")
            this_db.run("CREATE TABLE memo (\
                id integer primary key autoincrement,\
                taskid integer NOT NULL,\
                processid integer,\
                type TEXT\
                );")
            resolve();
        })}) 
    }

    //과업을 추가
    async add_task(task:Task): Promise<void> {
        if(!await this.exist()) throw("fn add_task DB not exist");
        console.log('[add_task],task',task)
        if(!interfaceOfTask(task)) throw("fn add_task 인터페이스 불일치");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `INSERT INTO task (name, type) VALUES ($name, $type);`
            this_db.all(sql_quary, toSQLobj(task,['id']), async (err)=>{
                if(err) reject({name:'fn add_task SQL err',err:err, task});
                else resolve();
            })
        })
    }
    async edit_task(task:Task): Promise<void> {
        if(!await this.exist()) throw("fn edit_task DB not exist")
        if(!interfaceOfTask(task)) throw("fn edit_task 인터페이스 불일치");
        if (!isInt(task.id) || task.id<0) throw("fn edit_task task.id 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `UPDATE task SET name=$name, type=$type WHERE id=$id;`
            this_db.all(sql_quary, toSQLobj(task,[]), async (err)=>{
                if(err) reject({name:'fn edit_task SQL err',err:err});
                else resolve();
            })
        })
    }
    //과업, 그 사이에 해당된 과업도 모두 삭제
    async del_task(taskid:number): Promise<void> {
        if(!await this.exist()) throw("fn del_task DB not exist")
        if (!isInt(taskid) || taskid<0) throw("fn del_task task.id 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            try{
                const sql_quary = `DELETE FROM task WHERE id=$id;`
                this_db.run(sql_quary, {$id:taskid}, async (err)=>{
                    if(err) reject({name:'fn del_task SQL err task삭제',err:err});
                    else resolve();
                })
                const sql_quary2 = `DELETE FROM process WHERE taskid=$id;`
                this_db.run(sql_quary2, {$taskid:taskid}, async (err, ...data)=>{
                    if(err) reject({name:'fn del_task SQL err process삭제',err:err});
                    else resolve();
                })
            }catch(err){
                reject({name:"fn del_task",err:err})   
            }
        })
    }
    async get_tasklist(): Promise<Task[]> {
        if(!await this.exist()) throw("fn del_task DB not exist")
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `SELECT * FROM task;`
            this_db.all(sql_quary, async (err, data:Task[])=>{
                if(err) reject({name:'fn get_task_list SQL err',err:err});
                else resolve(data);
            })
        })
    }


    //과정 관리
    async add_process(process:Process): Promise<void> {
        if(!await this.exist()) throw("fn add_process DB not exist");
        if(!interfaceOfProcess(process)) throw("fn add_process 인터페이스 불일치");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `INSERT INTO process (name, startdate,enddate,starttime,endtime,taskid,memoid,ended) VALUES ($name, $startdate,$enddate,$starttime,$endtime,$taskid,$memoid,$ended);`
            this_db.all(sql_quary, toSQLobj(process,['id']), async (err)=>{
                if(err) reject({name:'fn add_process SQL err',err:err, process:toSQLobj(process,['id'])});
                else resolve();
            })
        })
    }
    async edit_process(process:Process): Promise<void> {
        if(!await this.exist()) throw("fn edit_process DB not exist")
        if(!interfaceOfProcess(process)) throw("fn edit_process 인터페이스 불일치");
        if (!isInt(process.id) || process.id<0) throw("fn edit_process process.id 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `UPDATE process SET name=$name, startdate=$startdate,enddate=$enddate,starttime,endtime=$starttime,taskid=$taskid,memoid=$memoid WHERE id=$id;`
            this_db.all(sql_quary, toSQLobj(process,[]), async (err)=>{
                if(err) reject({name:'fn edit_process SQL err',err:err});
                else resolve();
            })
        })
    }
    async del_process(processid:number): Promise<void> {
        if(!await this.exist()) throw("fn del_process DB not exist")
        if (!isInt(processid) || processid<0) throw("fn del_process processid 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `DELETE FROM process WHERE id=$id;`
            this_db.all(sql_quary, {$id:processid}, async (err)=>{
                if(err) reject({name:'fn del_process SQL err',err:err});
                else resolve();
            })
        })
    }
    async get_processlist_all(): Promise<Process[]> {
        if(!await this.exist()) throw("fn get_processlist_all DB not exist")
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `SELECT * FROM process;`
            this_db.all(sql_quary, async (err, data:Process[])=>{
                if(err) reject({name:'fn get_processlist_all SQL err',err:err});
                else  resolve(data);
            })
        })
    }
    async get_processlist_bytaskid(taskid:number): Promise<Process[]> {
        if(!await this.exist()) throw("fn get_processlist_bytaskid DB not exist")
        if (!isInt(taskid) || taskid<0) throw("fn get_processlist_bytaskid taskid 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `SELECT * FROM process WHERE taskid=$taskid;`
            this_db.all(sql_quary, {$id:taskid}, async (err, data:Process[])=>{
                if(err) reject({name:'fn get_processlist_bytaskid SQL err',err:err});
                else resolve(data);
            })
        })
    }
    
    //메모 관리
    async add_memo(memo:Memo): Promise<void> {
        if(!await this.exist()) throw("fn add_memo DB not exist");
        if(!interfaceOfMemo(memo)) throw("fn add_memo 인터페이스 불일치");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `INSERT INTO memo (taskid, processid,type) VALUES ($taskid, $processid,t$ype);`
            this_db.all(sql_quary, toSQLobj(process,['id']), async (err)=>{
                if(err) reject({name:'fn add_memo SQL err',err:err});
                else resolve();
            })
        })
    }
    async edit_memo(memo:Memo): Promise<void> {
        if(!await this.exist()) throw("fn edit_memo DB not exist")
        if(!interfaceOfMemo(memo)) throw("fn edit_memo 인터페이스 불일치");
        if (!isInt(memo.id) || memo.id<0) throw("fn edit_memo memo.id 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `UPDATE memo SET name=$name, startdate=$startdate,enddate=$enddate,starttime,endtime=$starttime,taskid=$taskid,memoid=$memoid WHERE id=$id;`
            this_db.all(sql_quary, toSQLobj(process,[]), async (err, ...data)=>{
                if(err) reject({name:'fn edit_memo SQL err',err:err});
                else resolve();
            })
        })
    }
    async del_memo(memoid:number): Promise<void> {
        if(!await this.exist()) throw("fn del_memo DB not exist")
        if (!isInt(memoid) || memoid<0) throw("fn del_memo memo.id 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `DELETE FROM memo WHERE id=$id;`
            this_db.all(sql_quary, {$id:memoid}, async (err, ...data)=>{
                if(err) reject({name:'fn del_memo SQL err',err:err});
                else resolve();
            })
        })
    }
    async get_memo(memoid:Number): Promise<Memo[]> {
        if(!await this.exist()) throw("fn get_memo DB not exist")
        if (!isInt(memoid) || memoid<0) throw("fn get_memo memoid 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `SELECT * FROM memo where id=$id;`
            this_db.all(sql_quary, {$id:memoid}, async (err, data:Memo[])=>{
                if(err) reject({name:'fn get_memo SQL err',err:err});
                else  resolve(data);
            })
        })
    }
}

class ImageDB extends myDB{
    //name = "task"
    async setting(): Promise<void> {
        if(!(await this.isnone())) return;
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function) {
        this_db.serialize(()=>{
            this_db.run("CREATE TABLE images(\
                id TEXT primary key,\
                name TEXT NOT NULL\
                );")
            resolve();
        })}) 
    }
}


export const taskdb = new TaskDB('task')
export const imagedb = new ImageDB('image')
