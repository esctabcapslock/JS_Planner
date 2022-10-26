import {createHash} from 'crypto';
const SHA256 = (txt:string)=> createHash('sha256').update(txt).digest('base64url');


class UploadFile{
    constructor(){

    }


    private createFileName(){
        return SHA256(`${Math.random()}+${new Date()}`)
    }

    async push_file(userID:number, filename:string=''):Promise<string>{
        // throw('구현 안됨');
        // 파일 이름 생성
        const newName = this.createFileName()

        


        return newName
        // return new Promise(res=>{
        //     setTimeout(() => {
        //         console.log('kkk')
        //         res('1 sec!')
        //     }, 1000);
        // })
        


    }

    get_file(userID:number, filename:string){

    }
}

export const uploadFile = new UploadFile()