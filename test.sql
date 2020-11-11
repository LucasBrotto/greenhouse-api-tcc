create table user(
    id serial not null unique,
    login varchar(255) not null,
    password varchar(255) not null,
    token varchar(255)
);

create table greenhouse(
    id serial not null unique,
    temperature integer not null default 0,
    humidity integer not null default 0,
    ventilation integer not null default 0,
    irrigation integer not null default 0,
);

CREATE TABLE users_table (id integer primary key not null unique, login varchar(255) not null, password varchar(255) not null, token varchar(255));

CREATE TABLE greenhouse_table (id serial primary key not null unique, temperature integer not null default 0, humidity integer not null default 0, ventilation integer not null default 0, irrigation integer not null default 0, CONSTRAINT fk_users FOREIGN KEY(id_user) REFERENCES users_table(id));