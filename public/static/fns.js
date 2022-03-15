class myConfirm{
    constructor(dom){
        this.dom = dom
        dom.addEventListener('click',e=>{
            if(e.target===this.dom && this.dom.style.display != 'none'){
                console.log('none, noe')
                document.getElementById('btn_mycancel').click()
            }
        })
    }
    createConfirmObj(name, type, primary, explain, initvalue){
        if(typeof primary != 'boolean') throw("ConfirmObj에서, primary의 자료형이 boolean 아님")
        const out = {}
        out.name = name.trim()
        out.type = type
        out.primary = primary
        out.explain = explain
        out.initvalue = initvalue
        return out
    }
    confirm(header, msg, objlist){return new Promise((resolve,reject)=>{
        this.dom.style.display='block'
        let flag = true;
        let firmhtml = ''
        console.log('[confirm] objlist',objlist)
        for(const obj of objlist){

            // console.log(obj, obj.initvalue!=undefined?'value='+obj.initvalue:'')
            if(obj.primary) firmhtml+=`
            <div class="myconfirm_list">
                <label for="myconfirm_${obj.name}">${obj.name}</label>
                <input type="${obj.type}" id="myconfirm_${obj.name}" class="myconfirm_primary" ${obj.initvalue!=undefined?'value='+obj.initvalue:''}>
            </div>`
            else firmhtml+=`
            <div class="myconfirm_list">
                <input type="checkbox" id="myconfirm_op_${obj.name}" class="myconfirm_op" style="display:none;">
                <label for="myconfirm_op_${obj.name}">${obj.name}</label>
                <input type="${obj.type}" id="myconfirm_${obj.name}"  ${obj.initvalue!=undefined?'value='+obj.initvalue:''}>
            </div>`
        }
        this.dom.innerHTML = `<div id="myconfirm"><h2>${header}</h2><p>${msg}</p><p>${firmhtml}</p><button id="btn_myconfirm">확인</button><button id="btn_mycancel">취소</button>`
        document.getElementById('btn_mycancel').addEventListener('click',e=>{
            reject();
            this.dom.style.display = 'none'
            this.dom.innerHTML = ''  
        })
        document.getElementById('btn_myconfirm').addEventListener('click',e=>{
            // console.log(e,e.target)
            const out = {}
            for(const ele of document.getElementsByClassName('myconfirm_list')){
                // console.log(ele.children[0].tagName)

                let name, value;

                if (ele.children[0].tagName=='LABEL'){
                    name = ele.children[0].innerHTML
                    value = ele.children[1].value
                }else{
                    name = ele.children[1].innerHTML
                    if(ele.children[0].checked) value = ele.children[2].value
                    else value = null
                }
                const obj = objlist.filter(v=>v.name==name)[0]
                const type = obj.type
                // console.log('[thisname]', name, '[value]',value,'[type]',type)
                if(!obj.primary && value == null) out[name] = null
                else if(!type) {
                    throw('이상한 타입임..')
                }else if(type=='number') {
                        const tmp = Number(value)
                        if(isNaN(tmp)){alert('올바른 숫자인지 확인...'); throw('올바른 숫자 아님')}
                            else out[name] = tmp
                }
                else if(type=='string' && value.trim().length>0) out[name] = String(value)
                else if(type=='checkbox') out[name] = Boolean(value)
                else if(type=='date'){
                    const ar = value.split('-')
                    // console.log(ar,'ar',value,new Date(ar[0],ar[1]-1,ar[2]))
                    out[name] = (new Date(ar[0],ar[1]-1,ar[2])).getTime()
                }
                else{
                    alert('타입을 확인해주시오...')
                }    
                
            }
            console.log('confirm_my',out);
            this.dom.innerHTML = ''
            this.dom.style.display='none' 
            resolve(out)
        })                     
    })}
}

class myContext{
    constructor(dom){
        this.dom = dom
    }
    createContextObj(naem, explain,callback){
        const out = {}
    }
}