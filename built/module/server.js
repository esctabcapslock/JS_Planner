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
//tsc --target "es6" --module "commonjs"  module/server.ts
var port = 80;
var path = __dirname + "\\..\\..";
exports.httpserver = HTTP.createServer(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var url, method, url_arr, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = req.url;
                method = req.method;
                url_arr = typeof (url) == 'string' ? url.split('/') : [];
                console.log('[' + method + ']', '[url]', url, url_arr);
                if (!(method == 'GET')) return [3 /*break*/, 7];
                _a = url_arr[1];
                switch (_a) {
                    case '': return [3 /*break*/, 1];
                    case 'static': return [3 /*break*/, 3];
                }
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, (0, server_fn_1.sendfile)(res, path + '\\public\\index.html', 'utf8', '', undefined)];
            case 2:
                _b.sent();
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, (0, server_fn_1.sendfile)(res, path + '\\public' + url, 'utf8', '', undefined)];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                (0, server_fn_1._404)(res, url, "task-default");
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                if (method == 'POST') {
                    (0, server_fn_1.POST)(req, res, function (res, buffer) { return __awaiter(void 0, void 0, void 0, function () {
                        var req_data, _a, data, _b, _c, _d, _e, err_1;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    console.log('POST', buffer.length);
                                    try {
                                        req_data = buffer.length ? JSON.parse(buffer.toString()) : {};
                                    }
                                    catch (err) {
                                        (0, server_fn_1._404)(res, url, { name: "POST json 변환오류", err: err });
                                        return [2 /*return*/];
                                    }
                                    _a = url_arr[1];
                                    switch (_a) {
                                        case 'api': return [3 /*break*/, 1];
                                    }
                                    return [3 /*break*/, 43];
                                case 1:
                                    data = true;
                                    _f.label = 2;
                                case 2:
                                    _f.trys.push([2, 41, , 42]);
                                    _b = url_arr[2];
                                    switch (_b) {
                                        case 'task': return [3 /*break*/, 3];
                                        case 'process': return [3 /*break*/, 14];
                                        case 'memo': return [3 /*break*/, 27];
                                        case 'image': return [3 /*break*/, 38];
                                    }
                                    return [3 /*break*/, 39];
                                case 3:
                                    _c = url_arr[3];
                                    switch (_c) {
                                        case 'add': return [3 /*break*/, 4];
                                        case 'edit': return [3 /*break*/, 6];
                                        case 'del': return [3 /*break*/, 8];
                                        case 'getlist': return [3 /*break*/, 10];
                                    }
                                    return [3 /*break*/, 12];
                                case 4: return [4 /*yield*/, db_1.taskdb.add_task(req_data)];
                                case 5:
                                    _f.sent();
                                    return [3 /*break*/, 13];
                                case 6: return [4 /*yield*/, db_1.taskdb.add_task(req_data)];
                                case 7:
                                    _f.sent();
                                    return [3 /*break*/, 13];
                                case 8: return [4 /*yield*/, db_1.taskdb.add_task(req_data.taskid)];
                                case 9:
                                    _f.sent();
                                    return [3 /*break*/, 13];
                                case 10: return [4 /*yield*/, db_1.taskdb.get_tasklist()];
                                case 11:
                                    data = _f.sent();
                                    return [3 /*break*/, 13];
                                case 12: throw ("task-default 1");
                                case 13: return [3 /*break*/, 40];
                                case 14:
                                    _d = url_arr[3];
                                    switch (_d) {
                                        case 'add': return [3 /*break*/, 15];
                                        case 'edit': return [3 /*break*/, 17];
                                        case 'del': return [3 /*break*/, 19];
                                        case 'getlist': return [3 /*break*/, 21];
                                        case 'getlist_task': return [3 /*break*/, 23];
                                    }
                                    return [3 /*break*/, 25];
                                case 15: return [4 /*yield*/, db_1.taskdb.add_process(req_data)];
                                case 16:
                                    _f.sent();
                                    return [3 /*break*/, 26];
                                case 17: return [4 /*yield*/, db_1.taskdb.edit_process(req_data)];
                                case 18:
                                    _f.sent();
                                    return [3 /*break*/, 26];
                                case 19: return [4 /*yield*/, db_1.taskdb.del_process(req_data.processid)];
                                case 20:
                                    _f.sent();
                                    return [3 /*break*/, 26];
                                case 21: return [4 /*yield*/, db_1.taskdb.get_processlist_all()];
                                case 22:
                                    data = _f.sent();
                                    return [3 /*break*/, 26];
                                case 23: return [4 /*yield*/, db_1.taskdb.get_processlist_bytaskid(req_data.taskid)];
                                case 24:
                                    data = _f.sent();
                                    return [3 /*break*/, 26];
                                case 25: throw ("task-default 2");
                                case 26: return [3 /*break*/, 40];
                                case 27:
                                    _e = url_arr[3];
                                    switch (_e) {
                                        case 'add': return [3 /*break*/, 28];
                                        case 'edit': return [3 /*break*/, 30];
                                        case 'del': return [3 /*break*/, 32];
                                        case 'get': return [3 /*break*/, 34];
                                    }
                                    return [3 /*break*/, 36];
                                case 28: return [4 /*yield*/, db_1.taskdb.add_memo(req_data)];
                                case 29:
                                    _f.sent();
                                    return [3 /*break*/, 37];
                                case 30: return [4 /*yield*/, db_1.taskdb.edit_memo(req_data)];
                                case 31:
                                    _f.sent();
                                    return [3 /*break*/, 37];
                                case 32: return [4 /*yield*/, db_1.taskdb.del_memo(req_data.memoid)];
                                case 33:
                                    _f.sent();
                                    return [3 /*break*/, 37];
                                case 34: return [4 /*yield*/, db_1.taskdb.get_memo(req_data.memoid)];
                                case 35:
                                    data = _f.sent();
                                    return [3 /*break*/, 37];
                                case 36: throw ("task-default 3");
                                case 37: return [3 /*break*/, 40];
                                case 38: return [3 /*break*/, 40];
                                case 39: throw ("task-default 4");
                                case 40:
                                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf8' });
                                    res.end(JSON.stringify(data));
                                    return [3 /*break*/, 42];
                                case 41:
                                    err_1 = _f.sent();
                                    (0, server_fn_1._404)(res, url, { name: 'err server get', err: err_1 });
                                    return [3 /*break*/, 42];
                                case 42: return [3 /*break*/, 44];
                                case 43:
                                    (0, server_fn_1._404)(res, url, "default 5");
                                    _f.label = 44;
                                case 44: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                else
                    (0, server_fn_1._404)(res, url, 'method not allowed');
                _b.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); }).listen(port, function () { return console.log("server is running at localhost:" + port); });
db_1.taskdb.add_task({ id: null, name: "시험", type: null }).then(function (d) { return console.log('d', d); })["catch"](function (err) { return console.error(err); });
db_1.taskdb.add_task({ id: null, name: "밥", type: null }).then(function (d) { return console.log('d', d); })["catch"](function (err) { return console.error(err); });
db_1.taskdb.add_task({ id: null, name: "잠", type: null }).then(function (d) { return console.log('d', d); })["catch"](function (err) { return console.error(err); });
db_1.taskdb.add_process({ id: null, name: "일어나기", startdate: 1642550400000, enddate: null, starttime: null, endtime: null, taskid: 1, memoid: [], ended: 0 }).then(function (d) { return console.log('d', d); })["catch"](function (err) { return console.error(err); });
db_1.taskdb.add_process({ id: null, name: "자기", startdate: 1642636800000, enddate: null, starttime: null, endtime: null, taskid: 1, memoid: [], ended: 0 }).then(function (d) { return console.log('d', d); })["catch"](function (err) { return console.error(err); });
db_1.taskdb.add_process({ id: null, name: "라면", startdate: 1642723200000, enddate: null, starttime: null, endtime: null, taskid: 2, memoid: [], ended: 0 }).then(function (d) { return console.log('d', d); })["catch"](function (err) { return console.error(err); });
db_1.taskdb.add_process({ id: null, name: "김밥", startdate: 1642636800000, enddate: null, starttime: null, endtime: null, taskid: 2, memoid: [], ended: 0 }).then(function (d) { return console.log('d', d); })["catch"](function (err) { return console.error(err); });
//taskdb.edit_task({id:4, name:"시?험",type:'few'}).then(d=>console.log('d',d)).catch(err=>console.error('e',err))
//taskdb.del_task(4).then(d=>console.log('d',d)).catch(err=>console.error('e',err))
//taskdb.get_tasklist().then(d=>console.log(d)).catch(err=>console.error(err))
