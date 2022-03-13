class App{
    //this.processlist;
    //this.tasklist;
    constructor(){
        this.dom = {}
        this.TimezoneOffset = -540// 한국시간 GMT+9 고정
        const d = (x)=>document.getElementById(x)
        this.dom.mytable_task = d('mytable_task')
        this.dom.mytable_side = d('mytable_side')
        this.dom.mytalbe_data = d('mytalbe_data')
        this.dom.mytable_header = d('mytable_header')
        
        this.getdata();
        // 이번트리스너 추가
        d('btn_addtask').addEventListener('click',async e=>{
            const ans =  await myconfirm.confirm('task 추가','다음 사항 입력',[
                myConfirm.prototype.createConfirmObj('name','string',true, ''),
                myConfirm.prototype.createConfirmObj('type','string',false, '')
            ])
            this.db.add_task(ans)
        })
        this.dom.mytalbe_data.addEventListener('click',async e=>{
            const classList = [...e.target.classList]
            console.log(e.target, classList)
            if(classList.includes('cell')){
                console.log('[click - cell] 정보추가', e.target.id.split('_')[1])
                const ids = e.target.id.split('_')
                const tmpdate = new Date(Number(ids[1]))
                const tmp = d=>d<10?'0'+String(d):d
                const startdate = tmpdate.getFullYear()+'-'+tmp(tmpdate.getMonth()+1)+'-'+tmp(tmpdate.getDate())
                const taskid = Number(ids[2])
                const ans = await myconfirm.confirm('process 추가','다음 사항 입력',[
                    myConfirm.prototype.createConfirmObj('name','string',true, ''),
                    myConfirm.prototype.createConfirmObj('startdate','date',true, '',startdate),
                    myConfirm.prototype.createConfirmObj('enddate','date',false, '',startdate),
                    myConfirm.prototype.createConfirmObj('starttime','time',false, ''),
                    myConfirm.prototype.createConfirmObj('endtime','time',false, ''),
                    myConfirm.prototype.createConfirmObj('ended','checkbox',true, '',false),
                    
                ])
                ans.taskid = taskid
                ans.memoid = []
                this.db.add_process(ans)
            }
        })

        
        this.dom.mytalbe_data.addEventListener('contextmenu',e=>{
            // 참고로 사파리 동작 안 함...
        })
        this.dom.mytalbe_data.addEventListener('dblclick',e=>{
            // 참고로 Chrome Android, Samsung Internet 동작 안 함...
        })
    }
    toINTstr(n,d){
        const lth =  1+Math.log10(n)|0 //길이
        for(let i=0; i<d-lth; i++) n='0'+n;
        return n
    }
    convdate(d){
        if(typeof d == 'number') d = new Date(d);
        // console.log('getdate',d,new Date(d.getFullYear(), d.getMonth(), d.getDate()))
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())

        // return ((new Date(d) - (this.TimezoneOffset*60*1000) )/(24*3600*1000) )|0
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
        const p_date = this.convdate(new Date()) //현재시각

        

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

        // console.log(data)
        
        this.drow()
        return data
    }
    async drow(){
        this.dom.mytable_task.innerHTML = ''
        this.dom.mytable_side.innerHTML = ''
        this.dom.mytalbe_data.innerHTML = ''

        for(const v of this.tasklist){
            // console.log(v.name,this.dom.mytable_task)
            this.dom.mytable_task.innerHTML += `<div>${v.name}</div>`
        }

        let mindate = Infinity
        let maxdate = -Infinity
        for(const v of this.processlist){
            mindate = Math.min(v.startdate, mindate)
            maxdate = Math.max(v.startdate, maxdate)
            if(!isNaN(v.enddate)) maxdate = Math.max(v.enddate, maxdate)
        }
        if(mindate > (Number(this.convdate(new Date())) - 10*24*3600*1000)) mindate = this.convdate(new Date()) - 10 *24*3600*1000
        maxdate = Math.max(mindate + screen.availHeight / 10 *24*3600*1000, maxdate)
        //console.log('mindate, maxdate',mindate, maxdate)
        
        for(let dd  = mindate; dd<=maxdate; dd+=24*3600*1000){
            const d = this.convdate(dd)
            // console.log(d, d.getDate())
            this.dom.mytable_side.innerHTML+=`<div><div class="date">${this.toINTstr(d.getMonth()+1,2)}월 ${this.toINTstr(d.getDate(),2)}일</div><div class="day ${[0,6].includes(d.getDay()) ? 'holiday':''}">${'일월화수목금토'[d.getDay()]}</div></div>`
            this.dom.mytalbe_data.innerHTML+=`<div>${this.tasklist.map(v=>{
                return `<div id="cell_${Number(d)}_${v.id}" class="cell">&nbsp;</div>`
            }).join('')}</div>`
        }

        for(const v of this.processlist){
            const id = `cell_${Number(this.convdate(v.startdate))}_${v.taskid}`
            const ele = document.getElementById(id)
            if(!ele) {console.error(ele, id); continue;}
            if(ele.innerHTML=='&nbsp;') ele.innerHTML='';
            ele.innerHTML += `<div class="process process_${id}">${v.name}</div>`
        }

        this.drowtable()
    }

    async drowtable(){
        // 표처럼 만들기
        const ly = document.querySelectorAll('#mytable_side .date').length
        const lx = document.getElementById('mytalbe_data').childNodes[0].childNodes.length
        
        if(ly<=0 || lx <= 0) throw("표를 그릴 수 없음.")

        const arr_y = new Array(ly).fill(0)
        const arr_x = new Array(lx).fill(0)
        const arr_head_x = new Array(lx).fill(0)

        let x=0;
        for(const ele of document.getElementById('mytable_task').children)
            arr_head_x[x++] = ele.clientWidth
        

        let y=0;
        for (const row_ele of document.getElementById('mytalbe_data').children){
            let x=0
            for(const v of row_ele.children){
                arr_y[y] = Math.max(arr_y[y], v.clientHeight)
                arr_x[x] = Math.max(arr_x[x], v.clientWidth)
                x++;
            }
            y++;
        }
        // console.log(arr_x, arr_y)


        // header 보다 작은거면 바꾸기
        for (const row_ele of document.getElementById('mytalbe_data').children){
            let x=0
            for(const v of row_ele.children){
                if (arr_x[x] < arr_head_x[x])
                    v.style.width = arr_head_x[x]-8+'px'
                x++;
            }
            y++;
        }

        // 왼쪽 높이 설정
        y=0;
        for(const row_ele of document.getElementById('mytable_side').children){
            for(const ele of row_ele.childNodes){
                ele.style.height = arr_y[y]-4+'px'
            }
            y++;
        }

        x=0;
        for(const ele of document.getElementById('mytable_task').children){
            if(arr_x[x] > arr_head_x[x])
                ele.style.width = arr_x[x]-8+'px'
            x++
        }

        const leftwidth = document.getElementById('mytable_side').children[0].clientWidth
        document.getElementById('mytable_header').children[0].style.width = leftwidth -8-2+ 'px'
        document.getElementById('mytalbe_data').style.left = leftwidth + 'px'
    }
    
    db={
        add_task:(obj)=>{
            console.log('[add_task]',obj)
            if(obj.type == '') obj.type = null
            obj.id = null
            fetch('./api/task/add',{
                method:'post',
                body:JSON.stringify(obj)
            }).then(d=>{
                console.log(d)

                // 이거 추가로 그려버리기...
                
                this.tasklist.push(obj)
                
                this.drow()
            })
            // fetch 시키기...
        },
        add_process:(obj)=>{
            console.log('[add_task]',obj)
            if(obj.type == '') obj.type = null
            obj.id = null
            obj.ended = Number(obj.ended)
            fetch('./api/process/add',{
                method:'post',
                body:JSON.stringify(obj)
            }).then(d=>{
                console.log(d)

                // 이거 추가로 그려버리기...
                this.processlist.push(obj)
                this.drow()
            })

        }

    }
}