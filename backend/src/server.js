// We will need to use the 'require' format instead of the 'import' format
// so that things work on my M1 Mac. Not a big deal for this project and 
// I'm looking for a solution, but I haven't found one at this time. If I 
// can find a solution, I will be changeing lines like this
// const express = require('express');
// to lines like this
// import express from 'express';
const express = require('express');
const oracledb = require('oracledb');
if (process.platform === 'darwin') {
    try {
      oracledb.initOracleClient({libDir: process.env.HOME + '/workspaces/instantclient_19_8'});
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
}
const dotenv = require('dotenv');
const app = express();
const PORT = 5000;
dotenv.config();
var cors = require('cors');
app.use(cors());
app.use(express.json());

app.listen(PORT, ()=>{console.log(`Listening to port ${PORT}`);})

database_initialized = false

//Connection Management
async function init_database() {
	try {
		await oracledb.createPool({
			user: process.env.USER_NAME,
            password: process.env.DB_PASSWORD,
            connectionString: '//oracle.cise.ufl.edu/orcl'
		});
		console.log("Successfully created connection pool");
		database_initialized = true
	}
	catch (err) {
		console.log("Encountered an error creating a connection pool, retrying");
		await init_database();
	}
}

// Basic GET request
app.get('/sanity-check', (req,res) => {
    async function fetchDataCustomers(){
        try {
            const connection = await oracledb.getConnection();

            oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

            const query = `select * from "${process.env.USER_NAME.toUpperCase()}".sanityCheck`;

            const result = await connection.execute(query);
            
            try {
                await connection.close();
            }
            catch (err) {
                console.log("Encountered an error closing a connection in the connection pool.");
            }
            
            return result;
        } catch (error) {
            return error;
        }
    }

    fetchDataCustomers().then(dbRes => {
        res.send(dbRes);
    })
    .catch(err => {
        res.send(err);
    })
})

app.get('/total-tuples', (req,res) => {
    async function fetchTotalTuples() {
        try{
            const connection = await oracledb.getConnection();

            oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;

            const query = `select * from 
            (select count(*) as tuples_1 from "BRIAN.HOBLIN".crop_data), 
            (select count(*) as tuples_2 from "BRIAN.HOBLIN".pop_data)`;

            const result = await connection.execute(query);
            const totalTuples = result['rows'][0][0] + result['rows'][0][1];
            
            try {
                await connection.close();
            }
            catch (err) {
                console.log("Encountered an error closing a connection in the connection pool.");
            }
            return totalTuples;
            
        } catch (error) {
            return error;
        }

    }
    fetchTotalTuples().then(dbRes => {
        res.json(dbRes);
    })
    .catch(err => {
        res.send(err);
    })

})

init_database();