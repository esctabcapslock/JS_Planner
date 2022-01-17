"use strict";
exports.__esModule = true;
var db_1 = require("./module/db");
//tsc; node built/app
//npm test
//그냥 할 경우: tsc --target "es6" --module "commonjs"  app.ts
//아니면 tsc; node built/app 
// console.log("hello world!",__dirname)
// console.log("imagedb",imagedb)
db_1.taskdb.add_task({ id: null, name: "시험", type: null }).then(function (d) { return console.log(d); })["catch"](function (err) { return console.error(err); });
//taskdb.edit_task({id:4, name:"시?험",type:'few'}).then(d=>console.log('d',d)).catch(err=>console.error('e',err))
//taskdb.del_task(4).then(d=>console.log('d',d)).catch(err=>console.error('e',err))
//taskdb.get_tasklist().then(d=>console.log(d)).catch(err=>console.error(err))
