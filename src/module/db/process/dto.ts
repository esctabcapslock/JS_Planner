import {mustNatNumN, mustNatNum, mustStr, mustStrN, mustUnixDateNum, mustUnixDateNumN, mustBool, mustDateOrUnixDateNum, mustDateOrUnixDateNumN} from "../../mustBe"

export default class ProcessData {
    constructor(
        public id: number|null,
        public user_id: number,
        public task_id: number,
        public name:string,
        public alert_time: Date|null = null,
        public alert_name: string|null = null,
        public start_date: Date,
        public start_time: Boolean = false,
        public end_date: Date|null = null,
        public end_time: Boolean = false,
        public memo: number|null = null
    ) {}

    static new(
        data:{id: any,
        user_id: any,
        task_id: any,
        name: any,
        alert_time: any,
        alert_name: any,
        start_date: any,
        start_time: any,
        end_date: any,
        end_time: any,
        memo: any}
    ) {
        return new ProcessData(
            mustNatNumN(data.id),
            mustNatNum(data.user_id),
            mustNatNum(data.task_id),
            mustStr(data.name),
            mustDateOrUnixDateNumN(data.alert_time),
            mustStrN(data.alert_name),
            mustDateOrUnixDateNum(data.start_date),
            mustBool(data.start_time?data.start_time:false),
            mustDateOrUnixDateNumN(data.end_date),
            mustBool(data.end_time?data.end_time:false),
            mustNatNumN(data.memo)
        )
    }

    toEntity() {
        return {
            id : this.id,
            user_id : this.user_id,
            task_id : this.task_id,
            name: this.name,
            alert_time : this.alert_time,
            alert_name : this.alert_name,
            start_date : this.start_date,
            start_time : String(this.start_time),
            end_date : this.end_date,
            end_time : String(this.end_time),
            memo : this.memo,
        }
    }
}