import { mustNatNumN, mustNatNum, mustStr, mustStrN } from "../../mustBe"

export default class TaskData {
    constructor(
        public id: number | null,
        public userId: number,
        public name: string,
        public type: string | null = null,
        public memo: number | null = null,
    ) { }


    static new(
        data: {
            id: any,
            userId: any,
            name: any,
            type: any,
            memo: any
        }
    ) {
        return new TaskData(
            mustNatNumN(data.id),
            mustNatNum(data.userId),
            mustStr(data.name),
            mustStrN(data.type),
            mustNatNumN(data.memo)
        )
    }

    toEntity() {
        return {
            id: this.id,
            userId: this.userId,
            name: this.name,
            type: this.type,
            memo: this.memo

        }
    }
}

