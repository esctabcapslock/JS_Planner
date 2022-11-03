
import { Server } from "httptree"
// import {taskdb, imagedb, Task, interfaceOfTask}  from "../db"
import { thisProgramPath } from "../const"
import { uploadFile } from "../service/file"

type serviceServerOption = {userID:number}

export const serviceServer = new Server<serviceServerOption>(
    undefined,
    {payloadMaxSize:1024*1024*18} // 18MB 입력 재한
) // 유저 파일 전송

// 기초적 파일 호스팅
serviceServer.get((req,res,obj)=>res.sendFile(thisProgramPath+'\\public\\index.html'))

// 특정 페이지로 리다이랙트하기
const mainPageRedirect = (path:string)=>(req,res,obj:serviceServerOption)=>{
    res.statusCode = 302
    res.setHeader('Location',path)
    res.send('302 Found')
}

// 로그인 요청시 메인으로 리다이렉트
serviceServer.p('login').get(mainPageRedirect('/'))
serviceServer.p('signin').get(mainPageRedirect(''))

// api 코드
const $a = serviceServer.p('a');


/*
// sqlite용 코드
const $task = $a.p('task');
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
*/


const $file = $a.p('file');
$file.post(async (req,res,obj)=>{
    res.send(await uploadFile.push_file(req.body('raw'), obj.userID))
})

$file.p('*').post(async (req,res,obj)=>{
    res.send(await uploadFile.push_file(req.body('raw'), obj.userID, req.lastSubPath))
})

$file.p('*').get(async (req,res,obj)=>{
    const data =  uploadFile.get_file(obj.userID, req.lastSubPath)
    if(data==null) res.throw(403,'존재하지 않는 파일', 'this file not exists') 
    else res.send(data)
})