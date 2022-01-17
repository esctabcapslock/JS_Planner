import * as fs from "fs"
import * as sqlite3 from "sqlite3"

function isInt(value:any):boolean {
    if (isNaN(value)) return false;
    if (typeof(value) != "number") return false;
    if (isNaN(parseInt(''+value, 10))) return false;
    return parseInt(''+value,10)==value      
}

interface Task{
    id:number|null,
    name:string,
    type:string|null
}

interface Process{
    id:number|null,
    startdate:number,
    enddate:number|null,
    starttime:number|null,
    endtime:number|null,
    taskid:number,
    memoid:number|null,
}

interface Memo{
    id:number|null,
    taskid:number,
    processid:number|null,
    type:string|null,
}

/// /*<reference path="../typings/index.d.ts"/> */
  
// const taskdb = new sqlite3.Database('../db/task.sqlite')
// const imagedb = new sqlite3.Database('../db/imagedb.sqlite')
//https://joshua1988.github.io/ts/guide/classes.html#readonly

// const dblist: string[] = ['task.db', 'image.db']
// const db_exist = ():boolean => {
//     if(!fs.existsSync('../db')) fs.mkdirSync('../db');
//     const flag:boolean =  dblist.every(v=>fs.existsSync('../db/'+v))
//     if(flag) return true;
//     // try{create_db(); return true;}
//     // catch(err){
//     //     console.error('[db.ts, db_exist] err',err);
//     //     return false;
//     // }
// }

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
                startdate DATETIME NOT NULL,\
                enddate DATETIME,\
                starttime DATETIME,\
                endtime DATETIME,\
                taskid integer NOT NULL,\
                memoid TEXT\
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
        if(!await this.exist()) throw("fn add_task 데이터베이스 없음 오류");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `INSERT INTO task (name, type) VALUES ($name, $type);`
            this_db.run(sql_quary, {$name:task.name, $type:task.type}, async (err, ids, changes)=>{
                if(err) reject({name:'fn add_task SQL err',err:err});
                else {console.log('fn add_task data',this, ids, changes); resolve();}
            })
        })
    }
    async edit_task(task:Task): Promise<boolean> {
        if(!await this.exist()) throw("fn edit_task 데이터베이스 없음 오류")
        if (!isInt(task.id) || task.id<0) throw("fn edit_task task.id 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `UPDATE task SET name=$name, type=$type WHERE id=$id;`
            this_db.run(sql_quary, {$id: task.id, $name:task.name, $type:task.type}, async (err, ...data)=>{
                if(err) reject({name:'fn edit_task SQL err',err:err});
                else {console.log('fn edit_task data',data, this); resolve();}
            })
        })
    }
    async del_task(taskid:number): Promise<boolean> {
        if(!await this.exist()) throw("fn del_task 데이터베이스 없음 오류")
        if (!isInt(taskid) || taskid<0) throw("fn del_task task.id 정수 아님");
        const this_db:sqlite3.Database = this.db
        return new Promise(function (resolve:Function, reject:Function) {
            const sql_quary = `DELETE FROM task WHERE id=$id;`
            this_db.run(sql_quary, {$id:taskid}, async (err, ...data)=>{
                if(err) reject({name:'fn del_task SQL err',err:err});
                else {console.log('fn edit_task data',data, this); resolve();}
            })
        })
    }
    // async get_task_list(): Promise<Task[]> {}
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
