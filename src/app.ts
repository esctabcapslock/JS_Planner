import {httpserver} from "./module/server"
console.log("app starts running")
//tsc; node built/app
//npm test
//그냥 할 경우: tsc --target "es6" --module "commonjs"  app.ts
httpserver;
