// API test를 위한 것임.
import {request, test} from "./fn"

;
(async ()=>{

    var data =  await request('/', 'GET')
    const cookie = data.res.headers['set-cookie']?.toString().split(' ')[0].replace(/;$/,'')
    console.log(cookie)
    
    var data =  await request('/a/auth/login', 'POST', cookie, 
        "email=admin%40ew&pw=U0d_NhPd1GRb14W3HAdFEPq6FTdCIRMntCQiYTLK4E_zKjKf4Lf2d1OlgRNvV09iF0qVh0REMCwMPTtU5cR9YQ"
        )
    test("로그인", data.res.statusCode, 302)
    // console.log(data.res.statusCode, data.body)

    var data = await request('/', 'GET', cookie)
    test("메인페이지", data.res.statusCode, 200)


    // c
    var data = await request('/a/task','PUT', cookie, JSON.stringify({
        body:'1q2w3e4r'
    }))
    console.log(data.res.statusCode, JSON.stringify(data.body), )
    test("has id", 'id' in JSON.parse(data.body), true)
    var id = JSON.parse(data.body).id

    // r
    var data = await request('/a/task/abs','GET', cookie)
    test("get wrong id", data.res.statusCode, 404)
    
    var data = await request(`/a/task/${id}`,'GET', cookie)
    console.log(data.res.statusCode, JSON.stringify(data.body), )
    test(`get id ${id}`, JSON.parse(data.body), {id:id,user_id:1,body:"1q2w3e4r"})

    // u
    var data = await request(`/a/task/${id}`,'PATCH', cookie, JSON.stringify({
        body: '1q2w3e4r5t'
    }));
    test(`edit id ${id}`, data.body, 'ok')

    // u check
    var data = await request(`/a/task/${id}`,'GET', cookie)
    // console.log(data.res.statusCode, JSON.stringify(data.body), )
    test(`get id ${id}`, JSON.parse(data.body), {id:id,user_id:1,body:"1q2w3e4r5t"})

    // d check
    var data = await request(`/a/task/${id}`,'DELETE', cookie)
    test(`delete id ${id}`, data.body, 'ok')

    var data = await request(`/a/task/${id}`,'GET', cookie)
    console.log(data.res.statusCode, data.body, )
    test(`get id${id}`, data.res.statusCode, 404)

})();