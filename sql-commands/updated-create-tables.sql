create table crop_data(
    area_code number not null,
    area_name varchar2(70),
    item_code number not null,
    item_name varchar2(70),
    element_code number not null,
    element_name varchar2(70),
    year_code number not null,
    year number,
    unit varchar2(20),
    value decimal(20,7),
    constraint crop_data_pk primary key (area_code, item_code, element_code, year_code)
);

create table pop_data(
    location_id number not null,
    location_name varchar2(100),
    variant_id number,
    variant_type varchar2(20),
    time_year number not null,
    year_mid decimal(5,2),
    pop_male decimal(20,4),
    pop_female decimal(20,4),
    pop_total decimal(20,4),
    pop_density decimal(20,4),
    constraint pop_data_pk primary key (location_id, time_year)
);