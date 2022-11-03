import { createHash } from "crypto";

const SHA512 = (txt:string)=> createHash('sha512').update(txt).digest('base64url');
const salt = "ferge"
export default (plainPw:string)=>SHA512(salt+plainPw)