create table crop_data(
    area_code number not null,
    area_name varchar2(70),
    item_code number not null,
    item_name varchar2(70),
    element_code number not null,
    element_name varchar2(70),
    year number not null,
    unit varchar2(20),
    value decimal(20,7),
    constraint crop_data_pk primary key (area_code, item_code, element_code, year)
);

create table pop_data(
    location_name varchar2(100) not null,
    year number not null,
    pop_male decimal(20,4),
    pop_female decimal(20,4),
    pop_total decimal(20,4),
    pop_density decimal(20,4),
    constraint pop_data_pk primary key (location_name, year)
);

create table User_Info(
    user_name VARCHAR2(100),
    pass_word VARCHAR2(100),
    CONSTRAINT user_pk PRIMARY KEY (user_name)
);

create table User_Query(
    user_name NOT NULL REFERENCES User_Info (user_name),
    query_name VARCHAR2(50) NOT NULL UNIQUE,
    query_params VARCHAR2(100),
    CONSTRAINT user_query_pk PRIMARY KEY (user_name, query_name)
);