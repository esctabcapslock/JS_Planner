import {taskdb, imagedb}  from "./module/db"
//npm test
//그냥 할 경우: tsc --target "es6" --module "commonjs"  app.ts
//아니면 tsc; node built/app 
// console.log("hello world!",__dirname)
// console.log("imagedb",imagedb)

//taskdb.add_task({id:null, name:"시험",type:null}).then(d=>console.log(d)).catch(err=>console.error(err))
//taskdb.edit_task({id:4, name:"시?험",type:'few'}).then(d=>console.log('d',d)).catch(err=>console.error('e',err))
taskdb.del_task(4).then(d=>console.log('d',d)).catch(err=>console.error('e',err))