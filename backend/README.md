# CIS4301-Group-11 - BackEnd

## Create a .env file

Create a file in the `back-end` directory called `.env`.

The contents of the `.env` should be the following:
```
USER_NAME="Username"
DB_PASSWORD="Password"
```

Assuming you've already connected to your database using Oracle SQL Developer, you can find this information by right-clicking clicking your database that's listed in `Oracles Connections` and selecting `Properties...`.

## Installing Node Packages

Open a new terminal and run `cd backend`. Then run `npm install` to install the required Node packages.

## Start Local Server

Still in the `backend` directory, run `npm run start`. Once the server is running, the following lines should appear in the terminal,
```
Listening to port 5000
Successfully created connection pool
```

You can now navigate to (http://localhost:5000/sanity-check) to verify the sanity-check endpoint is retrieving data from the database.
