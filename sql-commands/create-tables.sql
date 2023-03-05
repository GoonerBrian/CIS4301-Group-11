alter table country drop constraint product_id_fk1;
alter table product drop constraint country_id_fk;
alter table product drop constraint element_code_fk;
alter table element_data drop constraint product_id_fk2;

commit;

drop table country;
drop table product;
drop table element_data;
drop table user_info;
drop table user_query;
drop table User_Info;
drop table User_Query;
drop table population;

commit;

create table Country(
    country_id NUMBER,
    country_name VARCHAR2(100),
    product_id NUMBER,
    CONSTRAINT country_pk PRIMARY KEY (country_id)
);

create table Product(
    product_id NUMBER,
    country_id NUMBER,
    element_code NUMBER,
    product_name VARCHAR2(100),
    UName VARCHAR2(100),
    CONSTRAINT product_pk PRIMARY KEY (product_id)
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

create table Element_Data(
    element_code NUMBER,
    product_id NUMBER,
    element_name VARCHAR2(100),
    element_unit VARCHAR2(20),
    element_value DECIMAL(31,2),
    element_yr NUMBER,
    CONSTRAINT element_pk PRIMARY KEY (element_code)
);

create table Population(
    pop_yr NUMBER,
    pop_male NUMBER,
    pop_female NUMBER,
    pop_density NUMBER,
    pop_total NUMBER,
    pop_country_id NUMBER,
    pop_product_id NUMBER,
    CONSTRAINT pop_of_country_fk1 FOREIGN KEY (pop_country_id) REFERENCES Country (country_id),
    CONSTRAINT pop_of_country_fk2 FOREIGN KEY (pop_product_id) REFERENCES Product (product_id)
);

commit;

ALTER TABLE Country ADD CONSTRAINT product_id_fk1 
    FOREIGN KEY (product_id) 
    REFERENCES Product (product_id) 
    INITIALLY DEFERRED DEFERRABLE;
    
ALTER TABLE Product ADD CONSTRAINT country_id_fk
    FOREIGN KEY (country_id)
    REFERENCES Country (country_id)
    INITIALLY DEFERRED DEFERRABLE;

ALTER TABLE Product ADD CONSTRAINT element_code_fk
    FOREIGN KEY (element_code)
    REFERENCES Element_Data (element_code)
    INITIALLY DEFERRED DEFERRABLE;
    
ALTER TABLE Element_Data ADD CONSTRAINT product_id_fk2 
    FOREIGN KEY (product_id) 
    REFERENCES Product (product_id) 
    INITIALLY DEFERRED DEFERRABLE;
    
commit;