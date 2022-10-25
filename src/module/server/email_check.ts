class EmailCheck{
    registered_list = []
    constructor(){
        this.registered_list = []
    }
}
class emaildata{
    callback : ()=>{

    }
    email:string
    registered:boolean
    private count:number
    private count_max = 5
    private vrification_number:number
    constructor(email:string, callback){
        this.email = email
        this.registered = false
        this.count = 0
        this.vrification_number = (Math.random()*100000)|0
        this.send_virification_email();
    }
    send_virification_email(){
        //TODO 이메일 보내기.
    }

    rciv():boolean{

        return true
    }

}