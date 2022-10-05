import * as HTTP from "http"
import * as fs from "fs"
import {taskdb, imagedb, Task, interfaceOfTask}  from "./db"
import {_404, sendfile, POST} from "./server_fn"
import {Server} from "httptree"
import { loginParse } from "./login"


//tsc --target "es6" --module "commonjs"  module/server.ts
const port:number = 80;
const path = `${__dirname}\\..\\..`
const hp = new Server<{userID:number}>()

hp.get((req,res,obj)=>res.sendFile(path+'\\public\\index.html'))
hp.p('s').p('*').get((req,res,obj)=>res.sendFile(path+'\\public\\static\\'+req.lastSubPath))
hp.p('i').p('*').get((req,res,obj)=>res.sendFile(path+'\\public\\images\\'+req.lastSubPath))

const $a = hp.p('a')
const $task = $a.p('task')
$task.get(async (req,res,obj)=>res.send(await taskdb.get_tasklist()))
$task.put(async (req,res,obj)=>{taskdb.add_task(req.body());res.statusCode = 201; res.send('ok')})
$task.patch(async (req,res,obj)=>{taskdb.edit_task(req.body());res.send('ok')})
$task.delete(async (req,res,obj)=>{taskdb.del_task(req.body());res.send('ok')})

const $process = $a.p('process')
$process.get(async (req,res,obj)=>res.send(await taskdb.get_processlist_all()))
$process.p(/\d+/).get(async (req,res,obj)=>res.send(await taskdb.get_processlist_bytaskid(Number(req.lastSubPath))))
$process.put(async (req,res,obj)=>{taskdb.add_process(req.body());res.statusCode = 201; res.send('ok')})
$process.p(/\d+/).patch(async (req,res,obj)=>{console.log('pppppp'); taskdb.edit_process(Number(req.lastSubPath), req.body());res.send('ok')})
$process.p(/\d+/).delete(async (req,res,obj)=>{taskdb.del_process(Number(req.lastSubPath));res.send('ok')})

const $memo = $a.p('memo')
$memo.p(/\d+/).get   (async (req,res,obj)=>res.send(await taskdb.get_memo(Number(req.lastSubPath))))
$memo.put            (async (req,res,obj)=>{taskdb.add_memo(req.body());res.statusCode = 201; res.send('ok')})
$memo.p(/\d+/).patch (async (req,res,obj)=>{taskdb.edit_memo(Number(req.lastSubPath), req.body());res.send('ok')})
$memo.p(/\d+/).delete(async (req,res,obj)=>{taskdb.del_memo(Number(req.lastSubPath));res.send('ok')})




// $task.get(async (req,res,obj)=>res.send(await taskdb.get_tasklist()))
// $task.get(async (req,res,obj)=>res.send(await taskdb.get_tasklist()))

// .get((req,res,data,obj)=>res.sendFile(path+'\\public\\index.html'))


export const httpserver = HTTP.createServer(async (req: HTTP.IncomingMessage, res: HTTP.ServerResponse) => {
    const url: string | undefined = req.url;
    const method: string | undefined = req.method;
    const url_arr: string[] = typeof (url) == 'string' ? url.split('/') : []
    console.log('['+method+']','[url]', url, url_arr)
    

    const login = loginParse(req,res)
    console.log('logpas - after', login)
    if(login==true) return



    if(hp.parse(req,res,{userID:login==false?1:login.userID})) return //_404(res,'dd','err!!')
    
    console.log('llll')

    // if(method=='GET') 
    // switch (url_arr[1]){
    //     case '': await sendfile(res,path+'\\public\\index.html','utf8','',undefined); break;
    //     case 'static': await sendfile(res,path+'\\public'+url,'utf8','',undefined); break;
    //     case 'images': await sendfile(res,path+'\\public'+url,'','',undefined); break;
    //     default: _404(res,url,"task-default");
    // }else if(method=='POST'){POST(req,res, async(res:HTTP.ServerResponse, buffer:Buffer)=>{
    //     console.log('POST',buffer?.length)
    //     if(!buffer){_404(res,url,{name:"POST buffer가 비었음"}); return}
    //     let req_data:any
    //     try{req_data = buffer.length ? JSON.parse(buffer.toString()) : {}
    //     }catch(err){_404(res,url,{name:"POST json 변환오류",err}); return;}
    //     switch (url_arr[1]){
    //         case 'a':
    //             let data:object|boolean = true
    //             try{
    //                 switch(url_arr[2]){
    //                 case 'task':
    //                     switch(url_arr[3]){
    //                         case 'add': await taskdb.add_task(req_data); break;
    //                         case 'edit': await taskdb.edit_task(req_data); break;
    //                         case 'del': await taskdb.del_task(req_data.taskid); break;
    //                         case 'getlist': data = await taskdb.get_tasklist(); break;
    //                         default: throw("task-default 1");
    //                     } break;
    //                 case 'process':
    //                     switch(url_arr[3]){
    //                         case 'add': await taskdb.add_process(req_data); break;
    //                         case 'edit': await taskdb.edit_process(req_data); break;
    //                         case 'del': await taskdb.del_process(req_data.processid); break;
    //                         case 'getlist': data = await taskdb.get_processlist_all(); break;
    //                         case 'getlist_task': data = await taskdb.get_processlist_bytaskid(req_data.taskid); break;
    //                         default: throw("task-default 2");
    //                     }break;
    //                 case 'memo':
    //                     switch(url_arr[3]){
    //                         case 'add': await taskdb.add_memo(req_data); break;
    //                         case 'edit': await taskdb.edit_memo(req_data); break;
    //                         case 'del': await taskdb.del_memo(req_data.memoid); break;
    //                         case 'get': data = await taskdb.get_memo(req_data.memoid); break;
    //                         default: throw("task-default 3");
    //                     }break;
    //                 case 'image':
    //                     break;
    //                 default: throw("task-default 4");
    //                 }
    //                 res.writeHead(200, { 'Content-Type': 'application/json; charset=utf8' });
    //                 res.end(JSON.stringify(data))
    //             }catch(err){
    //                 _404(res,url,{name:'err server get',err})
    //             }break;
    //         default: _404(res,url,"default 5");
    //     }})
    // }else 
        _404(res,url,' not allowed')

}).listen(port, () => console.log(`server is running at localhost:${port}`))

// taskdb.add_task({ id: null, name: "시험", type: null }).then(function (d) { return console.log('d',d); })["catch"](function (err) { return console.error(err); });
// taskdb.add_task({ id: null, name: "밥", type: null }).then(function (d) { return console.log('d',d); })["catch"](function (err) { return console.error(err); });
// taskdb.add_task({ id: null, name: "잠", type: null }).then(function (d) { return console.log('d',d); })["catch"](function (err) { return console.error(err); });
// taskdb.add_process({ id: null, name: "일어나기", startdate: 1642550400000, enddate: null, starttime: null, endtime: null, taskid: 1, memoid: [], ended: 0 }).then(function (d) { return console.log('d',d); })["catch"](function (err) { return console.error(err); });
// taskdb.add_process({ id: null, name: "자기", startdate: 1642636800000, enddate: null, starttime: null, endtime: null, taskid: 1, memoid: [], ended: 0 }).then(function (d) { return console.log('d',d); })["catch"](function (err) { return console.error(err); });
// taskdb.add_process({ id: null, name: "라면", startdate: 1642723200000, enddate: null, starttime: null, endtime: null, taskid: 2, memoid: [], ended: 0 }).then(function (d) { return console.log('d',d); })["catch"](function (err) { return console.error(err); });
// taskdb.add_process({ id: null, name: "김밥", startdate: 1642636800000, enddate: null, starttime: null, endtime: null, taskid: 2, memoid: [], ended: 0 }).then(function (d) { return console.log('d',d); })["catch"](function (err) { return console.error(err); });

//taskdb.edit_task({id:4, name:"시?험",type:'few'}).then(d=>console.log('d',d)).catch(err=>console.error('e',err))
//taskdb.del_task(4).then(d=>console.log('d',d)).catch(err=>console.error('e',err))
//taskdb.get_tasklist().then(d=>console.log(d)).catch(err=>console.error(err))