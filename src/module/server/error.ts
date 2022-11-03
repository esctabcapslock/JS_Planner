
class loginError extends Error{
    constructor(
        public statuscode:number,
        public msg:string,
        public shwoString:string|true,
    ){
        super()
    }
}