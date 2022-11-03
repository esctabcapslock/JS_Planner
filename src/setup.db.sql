CREATE DATABASE planner;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(64) UNIQUE NOT NULL,
    pw VARCHAR(512) NOT NULL,
    certified boolean DEFAULT FALSE NOT NULL
);

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    name VARCHAR(127) NOT NULL,
    type VARCHAR(127) DEFAULT NULL,
    memo integer references file DEFAULT NULL
);

CREATE TABLE file(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    save_name VARCHAR(128),
    size int NOT NULL
    file_name VARCHAR(128) DEFAULT NULL,
);

CREATE TABLE process(
    id SERIAL PRIMARY KEY,
    user_id integer references users NOT NULL,
    task_id integer references task NOT NULL,
    name VARCHAR(128),
    alert_time DATE DEFAULT NULL,
    alert_name VARCHAR(128) DEFAULT NULL,
    start_date DATE NOT NULL,
    start_time bool default false NOT NULL,
    end_date DATE DEFAULT NULL,
    end_time bool DEFAULT false NOT NULL,
    memo integer references file DEFAULT NULL
);
