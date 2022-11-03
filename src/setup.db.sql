-- db 생성
CREATE DATABASE planner;
-- 유저 생성
create user planner_admin with password '1q2w3e4r';
-- 원하는 테이블에 유저 권한
-- https://zetawiki.com/wiki/PostgreSQL_%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_%EC%86%8C%EC%9C%A0%EC%9E%90_%EB%B3%80%EA%B2%BD
ALTER DATABASE planner OWNER TO planner_admin;


-- 테이블 생성

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(64) UNIQUE NOT NULL,
    pw VARCHAR(86) NOT NULL,
    certified boolean DEFAULT FALSE NOT NULL
);

CREATE TABLE file(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    save_name VARCHAR(128),
    size int NOT NULL,
    file_name VARCHAR(128) DEFAULT NULL
);

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    name VARCHAR(128) NOT NULL,
    type VARCHAR(128) DEFAULT NULL,
    memo integer references file DEFAULT NULL
);



CREATE TABLE process(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    task_id integer references task NOT NULL,
    name VARCHAR(128) NOT NULL,
    alert_time DATE DEFAULT NULL,
    alert_name VARCHAR(128) DEFAULT NULL,
    start_date DATE NOT NULL,
    start_time bool default false NOT NULL,
    end_date DATE DEFAULT NULL,
    end_time bool DEFAULT false NOT NULL,
    memo integer references file DEFAULT NULL
);
