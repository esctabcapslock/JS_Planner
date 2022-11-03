import { PostgresError } from "postgres"

export const thisProgramPath = `${__dirname}\\..\\..`

export const emailRegexp = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/

export const printPostgresError = (e:PostgresError)=>{
    console.table({
        message:e.message, 
        name:e.name,
        code:e.code, 
        line:e.line, 
        file:e.file, 
        detail:e.detail
    })
}