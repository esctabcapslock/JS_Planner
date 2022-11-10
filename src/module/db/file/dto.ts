import { mustNatNumN, mustNatNum, mustStr, mustStrN, mustUnixDateNum, mustUnixDateNumN, mustBool } from "../../mustBe"

export default class FileData {
    constructor(
        public id: number | null,
        public user_id: number,
        public save_name: string,
        public size: number,
        public file_name: string | null = null
    ) { }

    static new(
        data: {
            id?: any,
            user_id?: any,
            save_name?: any,
            size?: any,
            file_name?: any,
        }
    ) {
        return new FileData(
            mustNatNumN(data.id),
            mustNatNum(data.user_id),
            mustStr(data.save_name),
            mustNatNum(data.size),
            mustStrN(data.file_name),
        )
    }

    toEntity():dataEntity{
        return {
            id: this.id,
            user_id: this.user_id,
            save_name: this.save_name,
            size: this.size,
            file_name: this.file_name,
        }
    }

    toAddEntity():dataEntity{
        return {
            user_id: this.user_id,
            save_name: this.save_name,
            size: this.size,
            file_name: this.file_name,
        }
    }
}

export type dataEntity = {
    id?: number | null,
    user_id?: number,
    save_name?: string,
    size?: number,
    file_name?: string | null
}