import {createHash} from 'crypto';
const SHA256 = (txt:string)=> createHash('sha256').update(txt).digest('base64url');
import {writeFileSync, readFileSync, existsSync, statSync, mkdirSync} from "fs";
import { thisProgramPath } from '../../const';

class UploadFile{
    constructor(){

    }


    private createFileName(){
        // TODO 중복 있는지 검사해야함.
        return SHA256(`${Math.random()}+${new Date()}`)
    }

    async push_file(fileData:Buffer, userID:number, filename:string=''):Promise<string>{
        
        // throw('구현 안됨');
        // 파일 이름 생성

        // TODO db에 파일 정보 추가 코드 짜야함.
        // TODO S2 업로드 코드 짜야함.
        const saveName = this.createFileName()

        !existsSync(thisProgramPath+'\\file\\') && mkdirSync(thisProgramPath+'\\file\\') // file 폴더 없으면 생성
        writeFileSync(thisProgramPath+'\\file\\'+saveName, fileData)

        return saveName
    }

    get_file(userID:number, filename:string):null|Buffer{
        // TODO 권한 접근 가능한지 체크
        
        if(!existsSync(thisProgramPath+'\\file\\'+filename)) return null
        else return readFileSync(thisProgramPath+'\\file\\'+filename)

    }
}

export const uploadFile = new UploadFile()