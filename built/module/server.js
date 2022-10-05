"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.httpserver = void 0;
var HTTP = require("http");
var db_1 = require("./db");
var server_fn_1 = require("./server_fn");
var httptree_1 = require("httptree");
var login_1 = require("./login");
//tsc --target "es6" --module "commonjs"  module/server.ts
var port = 80;
var path = "".concat(__dirname, "\\..\\..");
var hp = new httptree_1.Server();
hp.get(function (req, res, obj) { return res.sendFile(path + '\\public\\index.html'); });
hp.p('s').p('*').get(function (req, res, obj) { return res.sendFile(path + '\\public\\static\\' + req.lastSubPath); });
hp.p('i').p('*').get(function (req, res, obj) { return res.sendFile(path + '\\public\\images\\' + req.lastSubPath); });
var $a = hp.p('a');
var $task = $a.p('task');
$task.get(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = res).send;
            return [4 /*yield*/, db_1.taskdb.get_tasklist()];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); });
$task.put(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.add_task(req.body());
    res.statusCode = 201;
    res.send('ok');
    return [2 /*return*/];
}); }); });
$task.patch(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.edit_task(req.body());
    res.send('ok');
    return [2 /*return*/];
}); }); });
$task["delete"](function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.del_task(req.body());
    res.send('ok');
    return [2 /*return*/];
}); }); });
var $process = $a.p('process');
$process.get(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = res).send;
            return [4 /*yield*/, db_1.taskdb.get_processlist_all()];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); });
$process.p(/\d+/).get(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = res).send;
            return [4 /*yield*/, db_1.taskdb.get_processlist_bytaskid(Number(req.lastSubPath))];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); });
$process.put(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.add_process(req.body());
    res.statusCode = 201;
    res.send('ok');
    return [2 /*return*/];
}); }); });
$process.p(/\d+/).patch(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    console.log('pppppp');
    db_1.taskdb.edit_process(Number(req.lastSubPath), req.body());
    res.send('ok');
    return [2 /*return*/];
}); }); });
$process.p(/\d+/)["delete"](function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.del_process(Number(req.lastSubPath));
    res.send('ok');
    return [2 /*return*/];
}); }); });
var $memo = $a.p('memo');
$memo.p(/\d+/).get(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
    switch (_c.label) {
        case 0:
            _b = (_a = res).send;
            return [4 /*yield*/, db_1.taskdb.get_memo(Number(req.lastSubPath))];
        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
    }
}); }); });
$memo.put(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.add_memo(req.body());
    res.statusCode = 201;
    res.send('ok');
    return [2 /*return*/];
}); }); });
$memo.p(/\d+/).patch(function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.edit_memo(Number(req.lastSubPath), req.body());
    res.send('ok');
    return [2 /*return*/];
}); }); });
$memo.p(/\d+/)["delete"](function (req, res, obj) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    db_1.taskdb.del_memo(Number(req.lastSubPath));
    res.send('ok');
    return [2 /*return*/];
}); }); });
// $task.get(async (req,res,obj)=>res.send(await taskdb.get_tasklist()))
// $task.get(async (req,res,obj)=>res.send(await taskdb.get_tasklist()))
// .get((req,res,data,obj)=>res.sendFile(path+'\\public\\index.html'))
exports.httpserver = HTTP.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, method, url_arr, login;
    return __generator(this, function (_a) {
        url = req.url;
        method = req.method;
        url_arr = typeof (url) == 'string' ? url.split('/') : [];
        console.log('[' + method + ']', '[url]', url, url_arr);
        login = (0, login_1.loginParse)(req, res);
        console.log('logpas - after', login);
        if (login == true)
            return [2 /*return*/];
        if (hp.parse(req, res, { userID: login == false ? 1 : login.userID }))
            return [2 /*return*/]; //_404(res,'dd','err!!')
        console.log('llll');
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
        (0, server_fn_1._404)(res, url, ' not allowed');
        return [2 /*return*/];
    });
}); }).listen(port, function () { return console.log("server is running at localhost:".concat(port)); });
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
