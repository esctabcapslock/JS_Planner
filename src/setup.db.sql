-- 로그인
-- psql -U postgres

-- psql -U postgres
-- db 생성
CREATE DATABASE planner;
-- 유저 생성
create user planner_admin with password '1q2w3e4r';
-- 원하는 테이블에 유저 권한
-- https://zetawiki.com/wiki/PostgreSQL_%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EC%86%8C%EC%9C%A0%EC%9E%90_%EB%B3%80%EA%B2%BD
ALTER DATABASE planner OWNER TO planner_admin;

-- psql 접근
-- psql planner planner_admin --password
-- 데이터베이스도 권한 줘야함.
-- ALTER TABLE * OWNER TO planner_admin;
GRANT SELECT,INSERT,UPDATE,DELETE ON file, users,task,process TO planner_admin;

-- - owner를 직접 지정 후 database 생성 가능
--   CREATE DATABASE [db_name] OWNER [user_name];

-- 다음을 통해 권한 확인
select * from information_schema.role_table_grants where grantee = 'planner_admin'

-- 스키마의 모든 시퀀스에 대한 권한 부여
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO planner_admin;
-- 특정 스퀸스는 다음과 같이 한다.
GRANT USAGE, SELECT ON 시퀀스명 TO USER명;

-- 테이블 생성

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(64) UNIQUE NOT NULL,
    pw VARCHAR(86) NOT NULL,
    sign_date timestamp,
    last_login timestamp DEFAULT NULL,
    timezone INT DEFAULT NULL,
);

ALTER TABLE users
ADD COLUMN timezone INT DEFAULT NULL;

CREATE TABLE file(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    save_name VARCHAR(128) UNIQUE,
    size int NOT NULL,
    file_name VARCHAR(128) DEFAULT NULL
);

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    body VARCHAR(256) DEFAULT NULL
    -- name VARCHAR(128) NOT NULL,
    -- type VARCHAR(128) DEFAULT NULL,
    -- memo integer references file DEFAULT NULL
);



CREATE TABLE process(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    task_id integer references task NOT NULL,
    -- name VARCHAR(128) NOT NULL,
    alert_time timestamp  DEFAULT NULL,
    alert_name VARCHAR(128) DEFAULT NULL,
    body VARCHAR(256) DEFAULT NULL
    -- start_date timestamp  NOT NULL,
    -- start_time bool default false NOT NULL,
    -- end_date timestamp  DEFAULT NULL,
    -- end_time bool DEFAULT false NOT NULL,
    -- memo integer references file DEFAULT NULL
);
