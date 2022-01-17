"use strict";
exports.__esModule = true;
var server_1 = require("./module/server");
console.log("app starts running");
//tsc; node built/app
//npm test
//그냥 할 경우: tsc --target "es6" --module "commonjs"  app.ts
server_1.httpserver;
