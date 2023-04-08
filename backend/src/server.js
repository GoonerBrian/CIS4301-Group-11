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
    fetchTotalTuples().then(dbRes => {
        res.send(dbRes);
    })
    .catch(err => {
        res.send(err);
    })

})

app.get('/query1', (req,res) => {
    async function fetchQuery1() {
        try{
            const connection = await oracledb.getConnection();
            
            oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
            const year1 = '1989';
            const year2 = '1994';
            const itemName = 'Wheat';
            const element_code = '5510';
            const country = 'Germany';
            
            const query = 
            `with ranges(years, ecode, Icode) as
            (SELECT year, element_code, ITEM_CODE FROM "BRIAN.HOBLIN".crop_data WHERE year > ${year1} AND year < ${year2} 
            AND element_code = ${element_code} AND ITEM_NAME LIKE '%${itemName}%')
            SELECT cd.area_name, cd.item_name, cd.value, pd.pop_total, cd.year
            FROM "BRIAN.HOBLIN".crop_data cd, "BRIAN.HOBLIN".pop_data pd
            WHERE cd.area_name = pd.location_name AND cd.year = pd.year
            AND cd.AREA_NAME = '${country}'
            AND cd.year in (SELECT years FROM ranges) AND cd.element_code in (SELECT ecode FROM ranges) 
            AND cd.ITEM_CODE in (SELECT Icode from ranges)`;
            
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
    fetchQuery1().then(dbRes => {
        res.send(dbRes);
    })
    .catch(err => {
        res.send(err);
    })

})

app.get('/query2', (req,res) => {
    async function fetchQuery2() {
        try{
            const connection = await oracledb.getConnection();
            
            oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
            const year1 = '1989';
            const year2 = '1994';
            const itemName = 'Wheat';
            const element_code = '5510';
            const query = `with sums(cname, totals) as
            (select area_name, SUM(VALUE)
            FROM "BRIAN.HOBLIN".crop_data
            WHERE year > ${year1} AND year < ${year2} AND ITEM_NAME LIKE '%${itemName}%' AND VALUE IS NOT NULL AND element_code = ${element_code}
            GROUP BY area_name
            ORDER BY SUM(VALUE) ASC
            FETCH FIRST 5 ROWS ONLY)
            SELECT area_name, value, year
            FROM "BRIAN.HOBLIN".crop_data cd
            WHERE cd.year > ${year1} AND cd.year < ${year2} AND ITEM_NAME LIKE '%${itemName}%'
            AND cd.element_code = ${element_code}
            AND cd.area_name in (select cname from sums)`;
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
    fetchQuery2().then(dbRes => {
        res.send(dbRes);
    })
    .catch(err => {
        res.send(err);
    })

})

app.get('/query5', (req, res) => {
    async function fetchQuery5() {
      try {
        const connection = await oracledb.getConnection();
  
        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
  
        // Add the SQL query as a variable
        const query = `
        WITH 
        lowest_yield AS (
          SELECT area_name, AVG(VALUE) AS avg_yield
          FROM "BRIAN.HOBLIN".crop_data
          WHERE ITEM_NAME LIKE '%Wheat%' AND element_code = 5419
          GROUP BY area_name
          ORDER BY avg_yield ASC
          FETCH FIRST 3 ROWS ONLY
        ),
        highest_yield AS (
          SELECT area_name, AVG(VALUE) AS avg_yield
          FROM "BRIAN.HOBLIN".crop_data
          WHERE ITEM_NAME LIKE '%Wheat%' AND element_code = 5419
          GROUP BY area_name
          ORDER BY avg_yield DESC
          FETCH FIRST 3 ROWS ONLY
        ),
        yield_data AS (
          SELECT area_name, avg_yield
          FROM lowest_yield
          UNION ALL
          SELECT area_name, avg_yield
          FROM highest_yield
        ),
        production_data AS (
          SELECT area_name, AVG(VALUE) AS avg_production
          FROM "BRIAN.HOBLIN".crop_data
          WHERE ITEM_NAME LIKE '%Wheat%' AND element_code = 5510
          GROUP BY area_name
        )
        
        SELECT yd.area_name, yd.avg_yield, pd.avg_production, (yd.avg_yield / pd.avg_production) AS yield_area_vs_production_ratio
        FROM yield_data yd
        JOIN production_data pd ON yd.area_name = pd.area_name
        ORDER BY yd.avg_yield
        `;
  
        const result = await connection.execute(query);
  
        try {
          await connection.close();
        } catch (err) {
          console.log(
            "Encountered an error closing a connection in the connection pool."
          );
        }
        return result;
      } catch (error) {
        return error;
      }
    }
    fetchQuery5()
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  

init_database();