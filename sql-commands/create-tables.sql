create table Country(
    country_id NUMBER,
    country_name VARCHAR2(100),
    CONSTRAINT country_pk PRIMARY KEY (country_id)
);

commit;

create table Product(
    product_id NUMBER,
    product_name VARCHAR2(100),
    CID NOT NULL REFERENCES Country (country_id),
    UName VARCHAR2(100),
    CONSTRAINT product_pk PRIMARY KEY (product_id)
);

commit;

create table User_Info(
    user_name VARCHAR2(100),
    pass_word VARCHAR2(100),
    CONSTRAINT user_pk PRIMARY KEY (user_name)
);

commit;

create table User_Query(
    user_name NOT NULL REFERENCES User_Info (user_name),
    query_name VARCHAR2(50) NOT NULL UNIQUE,
    query_params VARCHAR2(100),
    CONSTRAINT user_query_pk PRIMARY KEY (user_name, query_name)
);

commit;

create table Element_Data(
    element_code NUMBER,
    element_name VARCHAR2(100),
    element_unit VARCHAR2(20),
    element_value DECIMAL(31,2),
    element_yr NUMBER,
    CONSTRAINT element_pk PRIMARY KEY (element_code)
);

commit;

create table Population(
    pop_yr NUMBER,
    pop_male NUMBER,
    pop_female NUMBER,
    pop_density NUMBER,
    pop_total NUMBER,
    pop_country_id NUMBER,
    pop_product_id NUMBER,
    CONSTRAINT pop_of_country_fk1 FOREIGN KEY (pop_country_id) REFERENCES Country (country_id),
    CONSTRAINT pop_of_country_fk2 FOREIGN KEY (pop_country_id) REFERENCES Product (product_id)
);

commit;
