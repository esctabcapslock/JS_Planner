"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.imagedb = exports.taskdb = void 0;
var fs = require("fs");
var sqlite3 = require("sqlite3");
function isInt(value) {
    if (isNaN(value))
        return false;
    if (typeof (value) != "number")
        return false;
    if (isNaN(parseInt('' + value, 10)))
        return false;
    return parseInt('' + value, 10) == value;
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
var myDB = /** @class */ (function () {
    function myDB(_filename) {
        this.dbdirpath = __dirname + "\\..\\..\\db"; //db가 저장된 파일위치
        this.filename = _filename;
        this.dbpath = this.dbdirpath + "\\" + this.filename + ".sqlite";
        if (!fs.existsSync(this.dbdirpath))
            fs.mkdirSync(this.dbdirpath);
        this.db = new sqlite3.Database(this.dbpath);
        this.setting();
    }
    myDB.prototype.isnone = function () {
        return __awaiter(this, void 0, void 0, function () {
            var this_db;
            return __generator(this, function (_a) {
                this_db = this.db;
                return [2 /*return*/, new Promise(function (resolve) {
                        this_db.all("select name from sqlite_master where type='table'", function (err, tables) {
                            resolve(!tables.length);
                        });
                    })];
            });
        });
    };
    //잡다한 매소들에서, 실행하기 전 확인하는 용도
    myDB.prototype.exist = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!fs.existsSync(this.dbdirpath))
                            fs.mkdirSync(this.dbdirpath);
                        if (!fs.existsSync(this.dbpath))
                            return [2 /*return*/, false];
                        if (!this.db)
                            this.db = new sqlite3.Database(this.dbpath);
                        return [4 /*yield*/, this.isnone()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.setting()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    return myDB;
}());
var TaskDB = /** @class */ (function (_super) {
    __extends(TaskDB, _super);
    function TaskDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //name = "task"
    TaskDB.prototype.setting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, this_db;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = !this.db;
                        if (_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.isnone()];
                    case 1:
                        _a = !(_b.sent());
                        _b.label = 2;
                    case 2:
                        if (_a)
                            return [2 /*return*/];
                        this_db = this.db;
                        return [2 /*return*/, new Promise(function (resolve) {
                                this_db.serialize(function () {
                                    this_db.run("CREATE TABLE task (\
                id integer primary key autoincrement,\
                name TEXT NOT NULL UNIQUE,\
                type TEXT\
                );");
                                    this_db.run("CREATE TABLE process (\
                id integer primary key autoincrement,\
                startdate DATETIME NOT NULL,\
                enddate DATETIME,\
                starttime DATETIME,\
                endtime DATETIME,\
                taskid integer NOT NULL,\
                memoid TEXT\
                );");
                                    this_db.run("CREATE TABLE memo (\
                id integer primary key autoincrement,\
                taskid integer NOT NULL,\
                processid integer,\
                type TEXT\
                );");
                                    resolve();
                                });
                            })];
                }
            });
        });
    };
    //과업을 추가
    TaskDB.prototype.add_task = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var this_db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exist()];
                    case 1:
                        if (!(_a.sent()))
                            throw ("fn add_task 데이터베이스 없음 오류");
                        this_db = this.db;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var _this = this;
                                var sql_quary = "INSERT INTO task (name, type) VALUES ($name, $type);";
                                this_db.run(sql_quary, { $name: task.name, $type: task.type }, function (err, ids, changes) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (err)
                                            reject({ name: 'fn add_task SQL err', err: err });
                                        else {
                                            console.log('fn add_task data', this, ids, changes);
                                            resolve();
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    TaskDB.prototype.edit_task = function (task) {
        return __awaiter(this, void 0, void 0, function () {
            var this_db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exist()];
                    case 1:
                        if (!(_a.sent()))
                            throw ("fn edit_task 데이터베이스 없음 오류");
                        if (!isInt(task.id) || task.id < 0)
                            throw ("fn edit_task task.id 정수 아님");
                        this_db = this.db;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var _this = this;
                                var sql_quary = "UPDATE task SET name=$name, type=$type WHERE id=$id;";
                                this_db.run(sql_quary, { $id: task.id, $name: task.name, $type: task.type }, function (err) {
                                    var data = [];
                                    for (var _i = 1; _i < arguments.length; _i++) {
                                        data[_i - 1] = arguments[_i];
                                    }
                                    return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (err)
                                                reject({ name: 'fn edit_task SQL err', err: err });
                                            else {
                                                console.log('fn edit_task data', data, this);
                                                resolve();
                                            }
                                            return [2 /*return*/];
                                        });
                                    });
                                });
                            })];
                }
            });
        });
    };
    TaskDB.prototype.del_task = function (taskid) {
        return __awaiter(this, void 0, void 0, function () {
            var this_db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exist()];
                    case 1:
                        if (!(_a.sent()))
                            throw ("fn del_task 데이터베이스 없음 오류");
                        if (!isInt(taskid) || taskid < 0)
                            throw ("fn del_task task.id 정수 아님");
                        this_db = this.db;
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                var _this = this;
                                var sql_quary = "DELETE FROM task WHERE id=$id;";
                                this_db.run(sql_quary, { $id: taskid }, function (err) {
                                    var data = [];
                                    for (var _i = 1; _i < arguments.length; _i++) {
                                        data[_i - 1] = arguments[_i];
                                    }
                                    return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (err)
                                                reject({ name: 'fn del_task SQL err', err: err });
                                            else {
                                                console.log('fn edit_task data', data, this);
                                                resolve();
                                            }
                                            return [2 /*return*/];
                                        });
                                    });
                                });
                            })];
                }
            });
        });
    };
    return TaskDB;
}(myDB));
var ImageDB = /** @class */ (function (_super) {
    __extends(ImageDB, _super);
    function ImageDB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //name = "task"
    ImageDB.prototype.setting = function () {
        return __awaiter(this, void 0, void 0, function () {
            var this_db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.isnone()];
                    case 1:
                        if (!(_a.sent()))
                            return [2 /*return*/];
                        this_db = this.db;
                        return [2 /*return*/, new Promise(function (resolve) {
                                this_db.serialize(function () {
                                    this_db.run("CREATE TABLE images(\
                id TEXT primary key,\
                name TEXT NOT NULL\
                );");
                                    resolve();
                                });
                            })];
                }
            });
        });
    };
    return ImageDB;
}(myDB));
exports.taskdb = new TaskDB('task');
exports.imagedb = new ImageDB('image');
