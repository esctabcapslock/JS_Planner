import * as postgres from 'postgres'
// import postgres from 'postgres'
// 공식 문서에는 이렇게 되어 있지만, 작동하지 않음

console.log('[postgres]')
const sql = postgres({
    host:'127.0.0.1',
    port: 5432,
    database:"planner",
    username:"planner_admin",
    password:"1q2w3e4r"
})
export default sql