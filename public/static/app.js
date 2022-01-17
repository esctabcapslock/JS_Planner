console.log(1)
class App{
    //this.processlist;
    //this.tasklist;
    constructor(){
        this.dom = {}
        const d = (x)=>document.getElementById(x)
        this.dom.mytable_task = d('mytable_task')
        this.dom.mytable_side = d('mytable_side')
        this.dom.mytalbe_data = d('mytalbe_data')
        this.dom.mytable_header = d('mytable_header')
        
        this.getdata();
    }
    toINTstr(n,d){
        const lth =  1+Math.log10(n)|0 //길이
        for(let i=0; i<d-lth; i++) n='0'+n;
        return n
    }
    getdate(d){
        //console.log('getdate',d,)
        if(typeof d == 'number') d = new Date(d);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    }
    async getdata(){
        const data = await Promise.all(
            [
                fetch('../api/task/getlist',{method:'POST'}).then(d=>d.json()), 
                fetch('../api/process/getlist',{method:'POST'}).then(d=>d.json())
            ])
        this.tasklist = data[0]
        this.processlist = data[1]

        //tasklist를 정렬하자
        const p_date = this.getdate(new Date()) //현재시각

        

        const order = {};
        this.processlist.map(v=>{
            let vv = v.taskid;
            if(!order[vv]) order[vv] = v.startdate;
            else order[vv] = Math.min(order[vv], v.startdate)
        })
        for(const key in order){
            if(order[key]<Number(p_date))  order[key] = Infinity;
        }
        this.tasklist.forEach(v => {
            if(order[v.id]==undefined) order[v.id] = Infinity
        })

        this.tasklist.sort((a,b)=>order[a.id]-order[b.id])

        console.log(data)
        
        this.drow()
        return data
    }
    async drow(){
        for(const v of this.tasklist){
            console.log(v.name,this.dom.mytable_task)
            this.dom.mytable_task.innerHTML += `<div>${v.name}</div>`
        }

        let mindate = Infinity
        let maxdate = -Infinity
        for(const v of this.processlist){
            mindate = Math.min(v.startdate, mindate)
            maxdate = Math.max(v.startdate, maxdate)
            if(!isNaN(v.enddate)) maxdate = Math.max(v.enddate, maxdate)
        }
        if(mindate > (Number(this.getdate(new Date())) - 10*24*3600*1000)) mindate = this.getdate(new Date()) - 10 *24*3600*1000
        maxdate = Math.max(mindate + screen.availHeight / 10 *24*3600*1000, maxdate)

        console.log('mindate, maxdate',mindate, maxdate)
        
        for(let dd  = mindate; dd<=maxdate; dd+=24*3600*1000){
            const d = this.getdate(dd)
            console.log(d, d.getDate())
            this.dom.mytable_side.innerHTML+=`<div><div class="date">${this.toINTstr(d.getMonth()+1,2)}월 ${this.toINTstr(d.getDate(),2)}일</div><div class="day ${[0,6].includes(d.getDay()) ? 'holiday':''}">${'일월화수목금토'[d.getDay()]}</div></div>`
            this.dom.mytalbe_data.innerHTML+=`<div>${this.tasklist.map(v=>{
                return `<div>/</div>`
            }).join('')}</div>`
        }
    }
    
}