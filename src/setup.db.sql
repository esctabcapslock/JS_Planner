CREATE DATABASE planner;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email CHAR(64) UNIQUE NOT NULL,
    pw CHAR(512) NOT NULL,
    certified boolean default FALSE
);

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    user_id integer references users,
    type CHAR(127) default NULL,
    name CHAR(127) default NULL
);

CREATE TABLE file(
    id CHAR(128) PRIMARY KEY,
    name CHAR(128) default NULL,
    user_id integer references users,
    size int NOT NULL
);

CREATE TABLE process(
    id SERIAL PRIMARY KEY,
    user_id integer references  users,
    task_id integer references  task,
    alert_time DATE,
    alert_name CHAR(128),
    start_date DATE NOT NULL,
    start_time bool default false,
    end_date DATE default NULL,
    end_time bool default false,
    memo CHAR(128) references  file
);
