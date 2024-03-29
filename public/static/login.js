const salt = 'gr34f'

async function sha512(str) {
    const buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str));
    // return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

  
class App{
    constructor(){
        this.passWord_hashed = false   
        console.log('dff')
        this.addEventListener()
    }
    
    addEventListener(){
        const $password_input = document.getElementById('password_input')
        $password_input.addEventListener('keydown',this.pwencrypt)
        $password_input.addEventListener('change',this.pwencrypt)
        $password_input.addEventListener('click',this.pwencrypt)
        $password_input.addEventListener('load',this.pwencrypt)
    }

    async pwencrypt(){
        const $password_input = document.getElementById('password_input')
        const $password_output = document.getElementById('password_output')
        this.passWord_hashed = false
        $password_output.value = await sha512(salt+$password_input.value)
        this.passWord_hashed = true
    }
}