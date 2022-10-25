
import {Server} from "httptree"
import { thisProgramPath } from "../const"


export const staticServer = new Server<undefined>() // 정적 파일 전송

// 기본적인 파일 호스팅
//node_modules\bootstrap\dist\js

const $s = staticServer.p('s')

$s.p('bootstrap').p('js').p('*').get((req,res,obj)=>res.sendFile(thisProgramPath+'\\node_modules\\bootstrap\\dist\\js\\'+req.lastSubPath))
$s.p('bootstrap').p('css').p('*').get((req,res,obj)=>res.sendFile(thisProgramPath+'\\node_modules\\bootstrap\\dist\\css\\'+req.lastSubPath))
$s.p('*').get((req,res,obj)=>res.sendFile(thisProgramPath+'\\public\\static\\'+req.lastSubPath))

staticServer.p('i').p('*').get((req,res,obj)=>res.sendFile(thisProgramPath+'\\public\\images\\'+req.lastSubPath))
