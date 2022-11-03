export const mustInt: (x:any)=>number = x=>{
    if(!Number.isInteger(x)) throw(`[mustInt] ${x}는 정수가 아님`)
    return x
}
export const mustPosInt: (x:any)=>number = x=>{
    if(!Number.isInteger(x)) throw(`[mustPosInt] ${x}는 양의 정수가 아님`)
    if(mustInt(x)<=0)  throw(`[mustPosInt] ${x}는 양의 정수가 아님`)
    return x
}
export const mustNatNum: (x:any)=>number = x=>{
    if(!Number.isInteger(x)) throw(`[mustNatNum] ${x}는 자연수가 아님`)
    if(x<0)  throw(`[mustNatNum] ${x}는 자연수가 아님`)
    return x
}
export const mustNegInt: (x:any)=>number = x=>{
    if(!Number.isInteger(x)) throw(`[mustNegInt] ${x}는 음의 정수가 아님`)
    if(x>=0)  throw(`[mustNegInt] ${x}는 음의 정수가 아님`)
    return x
}
export const mustStr: (x:any)=>string = x=>{
    if(typeof x !== 'string') throw(`[mustStr] ${x}는 문지열이 아님`)
    return x
}

export const mustStrArr: (x:any)=>string[] = x=>{
    if(!Array.isArray(x)) throw(`[mustStrArr] ${x}는 배열이 아님`)
    x.forEach((x,i)=>{
        if(typeof x !== 'string') throw(`[mustStrArr] "${x}[${i}] = ${x[i]}"은 문자열이 아님`)
    })
    return x
}


export const mustUnixDateNum: (x:any)=>Date = x=>{
    if(!Number.isInteger(x)) throw(`[mustUnixDateNum] ${x}는 정수가 아님`)
    return new Date(x)
}

export const mustBool: (x:any)=>boolean = x=>{
    if(typeof x !== 'boolean') throw(`[mustBool] ${x}는 bool이 아님`)
    return x
}

// NaN, Infinity 포함함.
export const mustNumArr: (x:any)=>string[] = x=>{
    if(!Array.isArray(x)) throw(`[mustNumArr] ${x}는 배열이 아님`)
    x.forEach((x,i)=>{
        if(typeof x !== 'number') throw(`[mustStrArr] "${x}[${i}] = ${x[i]}"은 숫자가 아님`)
    })
    return x
}

export const mustIntArr: (x:any)=>string[] = x=>{
    if(!Array.isArray(x)) throw(`[mustNumArr] ${x}는 배열이 아님`)
    x.forEach((x,i)=>{
        if(!Number.isInteger(x)) throw(`[mustStrArr] "${x}[${i}] = ${x[i]}"은 숫자가 아님`)
    })
    return x
}


//////////// undifind, null 포함

export const mustIntN: (x:any)=>number|null = x=>{
    if(x===undefined || x===null) return null
    if(!Number.isInteger(x)) throw(`[mustInt] ${x}는 정수가 아님`)
    return x
}
export const mustPosIntN: (x:any)=>number|null = x=>{
    if(x===undefined || x===null) return null
    if(!Number.isInteger(x)) throw(`[mustPosInt] ${x}는 양의 정수가 아님`)
    if(mustInt(x)<=0)  throw(`[mustPosInt] ${x}는 양의 정수가 아님`)
    return x
}
export const mustNatNumN: (x:any)=>number|null = x=>{
    if(x===undefined || x===null) return null
    if(!Number.isInteger(x)) throw(`[mustNatNum] ${x}는 자연수가 아님`)
    if(x<0)  throw(`[mustNatNum] ${x}는 자연수가 아님`)
    return x
}
export const mustNegIntN: (x:any)=>number|null = x=>{
    if(x===undefined || x===null) return null
    if(!Number.isInteger(x)) throw(`[mustNegInt] ${x}는 음의 정수가 아님`)
    if(x>=0)  throw(`[mustNegInt] ${x}는 음의 정수가 아님`)
    return x
}
export const mustStrN: (x:any)=>string|null = x=>{
    if(x===undefined || x===null) return null
    if(typeof x !== 'string') throw(`[mustStr] ${x}는 문지열이 아님`)
    return x
}

export const mustStrArrN: (x:any)=>string[]|null = x=>{
    if(x===undefined || x===null) return null
    if(!Array.isArray(x)) throw(`[mustStrArr] ${x}는 배열이 아님`)
    x.forEach((x,i)=>{
        if(typeof x !== 'string') throw(`[mustStrArr] "${x}[${i}] = ${x[i]}"은 문자열이 아님`)
    })
    return x
}

// NaN, Infinity 포함함.
export const mustNumArrN: (x:any)=>string[] = x=>{
    if(x===undefined || x===null) return null
    if(!Array.isArray(x)) throw(`[mustNumArr] ${x}는 배열이 아님`)
    x.forEach((x,i)=>{
        if(typeof x !== 'number') throw(`[mustStrArr] "${x}[${i}] = ${x[i]}"은 숫자가 아님`)
    })
    return x
}

export const mustIntArrN: (x:any)=>string[] = x=>{
    if(x===undefined || x===null) return null
    if(!Array.isArray(x)) throw(`[mustNumArr] ${x}는 배열이 아님`)
    x.forEach((x,i)=>{
        if(!Number.isInteger(x)) throw(`[mustStrArr] "${x}[${i}] = ${x[i]}"은 숫자가 아님`)
    })
    return x
}

export const mustUnixDateNumN: (x:any)=>Date|null = x=>{
    if(x===undefined || x===null) return null
    if(!Number.isInteger(x)) throw(`[mustUnixDateNumN] ${x}는 정수가 아님`)
    return new Date(x)
}

export const mustBoolN: (x:any)=>boolean = x=>{
    if(x===undefined || x===null) return null
    if(typeof x !== 'boolean') throw(`[mustBoolN] ${x}는 bool이 아님`)
    return x
}