class myContext{
    constructor(dom){
        this.dom = dom
        document.documentElement.addEventListener('click',e=>{
            const classList = [...e.target.classList]
            if(!classList.includes('context')){
                // console.log('stopPropagation')
                // e.prev   entDefault()
                // e.stopPropagation()
                this.contextoff()
                // context 끄기
            }
        })
    }
    createContextObj(name, explain,callback){
        const out = {}
        out.name = name.trim()
        out.explain = explain
        out.callback = callback
        return out
    }
    context(pos, objlist){
        
        this.dom.innerHTML=`<div id="mycontext" class="mycontext" style="top:${pos.y}px; left:${pos.x}px;">${objlist.map(v=>{
            return `<div class="mycontext_opt mycontext" id="mycontext_opt_${v.name}">
                <span class="mycontext">${v.name}</span><span>${v.explain}</span>
            </div>`
        }).join('\n')}</div>`

        for (const obj of objlist){
            const ele = document.getElementById('mycontext_opt_'+obj.name)
            // console.log(obj, ele,'mycontext_opt_'+obj.name)
            ele.addEventListener('click',e=>{
                console.log('obj',obj)
                obj.callback()
                this.contextoff()
            })
            ele.addEventListener('contextmenu',e=>{
                console.log('obj',obj)
                obj.callback()
                e.preventDefault()
                this.contextoff()
            })
        }

        


    }

    contextoff(){
        if(this.dom.innerHTML) {this.dom.innerHTML = ''; return true}
        else return false
    }

    
}