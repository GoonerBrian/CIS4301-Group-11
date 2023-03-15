# CIS4301-Group-11 - BackEnd

## Connect to UF VPN

Make sure to connect to the [University of Florida VPN](https://it.ufl.edu/ict/documentation/network-infrastructure/vpn/) before proceeding. Connecting to the database will not be possible without connecting to the VPN.

## Create simple Customers table in SQL Developer

This is only required for the `/sanity-check` at the end of the page and can be skipped if you do not want to preform the sanity-check (not recommended).

- Open Oracle SQL Developer and connect to the CISE database
- Run the following to create the `sanityCheck` table

```
create table sanityCheck
(
    attr_1 varchar2(20),
    attr_2 varchar2(20),
    attr_3 varchar2(20)
);
```

- You should see a response that says "Table SANITYCHECK created."
- Run the following to insert data into your new table

```
insert into sanityCheck values ('attr 1', 'attr 2', 'attr 3');
```

- You should see a response that says "1 row inserted."
- Lastly, run `commit;` to save changes to your table.

## Create a .env file

Create a file in the `back-end` directory called `.env`.

The contents of the `.env` should be the following:

```
USER_NAME="Username"
DB_PASSWORD="Password"
```

Assuming you've already connected to your database using Oracle SQL Developer, you can find this information by right-clicking clicking your database that's listed in `Oracles Connections` and selecting `Properties...`.

## Installing Node Packages

Open a new terminal and run `cd backend`. Run `nvm use 14.21.2` to ensure you're using the correct version of Node. Then run `npm install` to install the required Node packages.

## Start Local Server

Still in the `backend` directory, run `npm run start`. Once the server is running, the following lines should appear in the terminal,

```
Listening to port 5000
Successfully created connection pool
```

You can now navigate to [localhost:5000/sanity-check](http://localhost:5000/sanity-check) to verify the sanity-check endpoint is retrieving data from the database.
