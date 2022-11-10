export class ReqError extends Error{
    constructor(
        message:string,
        public publicMessage: boolean|string,
        public statusCode: number
    ){
        super(message)
        Object.setPrototypeOf(this, ReqError.prototype);
    }

    public get pubMsg():string{
        if(this.publicMessage == true) return this.message
        else if(this.publicMessage == false) return ''
        else return this.publicMessage
    }
}