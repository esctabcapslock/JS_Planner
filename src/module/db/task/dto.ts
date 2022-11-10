import { mustNatNumN, mustNatNum, mustStr, mustStrN } from "../../mustBe"

export default class TaskData {
    constructor(
        public id: number | null,
        public user_id: number,
        public body: string | null,
        // public type: string | null = null,
        // public memo: number | null = null,
    ) { }


    static new(
        data: {
            id?: any,
            user_id?: any,
            name?: any,
            body?: any
            // type: any,
            // memo: any
        }
    ) {
        return new TaskData(
            mustNatNumN(data.id),
            mustNatNum(data.user_id),
            mustStr(data.body),
            // mustStr(data.name),
            // mustStrN(data.type),
            // mustNatNumN(data.memo)
        )
    }

    toEntity() {
        return {
            id: this.id,
            user_id: this.user_id,
            body: this.body,
            // name: this.name,
            // type: this.type,
            // memo: this.memo

        }
    }

    toEditEntity() {
        return {
            body: this.body
        }
    }

    toAddEntity() {
        return {
            user_id: this.user_id,
            body: this.body
        }
    }
}

