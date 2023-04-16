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
            //const year1 = '1989';
            //const year2 = '1994';
            //const itemName = 'Wheat';
            //const element_code = '5510';
            //const country = 'Germany';
            const year1 = req.query.year1;
            const year2 = req.query.year2;
            const itemName = req.query.itemName;
            const element_code = req.query.eCode;
            const country = req.query.country;
            
            const query = 
            `with ranges(years, ecode, Icode) as
            (SELECT year, element_code, ITEM_CODE FROM "BRIAN.HOBLIN".crop_data WHERE year >= ${year1} AND year <= ${year2} 
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
            //const year1 = '2000';
            //const year2 = '2003';
            //const itemName = 'Garlic';
            //const element_code = '5510';
            
            const year1 = req.query.year1.toString();
            const year2 = req.query.year2.toString();
            const itemName = req.query.itemName.toString();
            const element_code = req.query.eCode.toString();
           
            
            const query = `with sums(cname, totals) as
            (select area_name, SUM(VALUE)
            FROM "BRIAN.HOBLIN".crop_data
            WHERE year between ${year1} AND ${year2} AND ITEM_NAME LIKE '%${itemName}%' AND VALUE IS NOT NULL AND element_code = ${element_code}
            AND area_name <> 'World' AND area_name NOT LIKE '%Europe%' AND area_name NOT LIKE '%Africa%'
            AND area_name NOT LIKE '%Oceania%' AND area_name NOT LIKE '%Northern America%' AND area_name NOT LIKE '%South America%'
            AND area_name NOT LIKE '%Asia%' AND area_name NOT LIKE '%Americas%' AND area_name NOT LIKE '%mainland%'
            AND area_name NOT LIKE '%Food%'
            GROUP BY area_name
            ORDER BY SUM(VALUE) DESC
            FETCH FIRST 3 ROWS ONLY)
            SELECT area_name, value, year
            FROM "BRIAN.HOBLIN".crop_data cd
            WHERE cd.year between ${year1} AND ${year2} AND cd.ITEM_NAME LIKE '%${itemName}%'
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

app.get('/query3', (req,res) => {
    async function fetchQuery3() {
        try{
            const connection = await oracledb.getConnection();
            
            oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
            const area1 = req.query.area1;
            const area2 = req.query.area2;
            const year1 = req.query.year1;
            const year2 = req.query.year2;
            const itemName = req.query.itemName;

            const query = 
            `select a1.a1yr year1,
                    a1.area1 area1,
                    a1.ratio1 area1_ratio,  
                    a2.a2yr year2,
                    a2.area2 area2,
                    a2.ratio2 area2_ratio
             from (
                 select c1.area_name area1, c1.year a1yr, c1.value hectares, value_2 tonnes, c1.value/value_2 ratio1
                 from "BRIAN.HOBLIN".crop_data c1
                     inner join
                         (select c2.year c2_yr, c2.area_name c2_country, c2.item_name, c2.unit unit_2, c2.value value_2
                         from "BRIAN.HOBLIN".crop_data c2
                         where c2.year between ${year1} and ${year2}
                         and c2.unit = 'ha'
                         and c2.item_name = '${itemName}'
                         and c2.area_name = '${area1}')
                     on c1.year = c2_yr and c1.area_name = c2_country
                 where c1.year between ${year1} and ${year2}
                 and c1.unit = 'tonnes'
                 and c1.item_name = '${itemName}'
                 and c1.area_name = '${area1}'
             ) a1
             inner join (
                 select c1.area_name area2, c1.year a2yr, c1.value hectares, value_2 tonnes, c1.value/value_2 ratio2
                 from "BRIAN.HOBLIN".crop_data c1
                     inner join
                         (select c2.year c2_yr, c2.area_name c2_country, c2.item_name, c2.unit unit_2, c2.value value_2
                         from "BRIAN.HOBLIN".crop_data c2
                         where c2.year between ${year1} and ${year2}
                         and c2.unit = 'ha'
                         and c2.item_name = '${itemName}'
                         and c2.area_name = '${area2}')
                     on c1.year = c2_yr and c1.area_name = c2_country
                 where c1.year between ${year1} and ${year2}
                 and c1.unit = 'tonnes'
                 and c1.item_name = '${itemName}'
                 and c1.area_name = '${area2}'
             ) a2
             on a1.a1yr = a2.a2yr`;

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
    fetchQuery3().then(dbRes => {
        res.send(dbRes);
    })
    .catch(err => {
        res.send(err);
    })

})

app.get('/query4', (req,res) => {
    async function fetchQuery4() {
        try{
            const connection = await oracledb.getConnection();
            
            oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
            const areaNameq4 = 'United States of America';
            const itemNameq4 = 'Apples';

            const query = 
            `WITH bestYear as(
            SELECT year
            FROM "BRIAN.HOBLIN".crop_data
            WHERE area_name = '${areaNameq4}' 
                    AND item_name = '${itemNameq4}' 
                    AND unit = 'tonnes'
                    AND value = (SELECT max(value)
                                FROM "BRIAN.HOBLIN".crop_data
                                WHERE area_name = '${areaNameq4}' 
                                    AND item_name = '${itemNameq4}'
                                    AND unit = 'tonnes'
                                )
            )
            SELECT area_name, item_name,CD.year, value 
            FROM "BRIAN.HOBLIN".crop_data CD, bestYear
            WHERE CD.year <= bestYear.year+5
                    AND CD.year >= bestYear.year-5
                    AND area_name = '${areaNameq4}' 
                    AND item_name = '${itemNameq4}' 
                    AND unit = 'tonnes'`;

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
    fetchQuery4().then(dbRes => {
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
        const itemName = req.query.itemName;
        
        // Add the SQL query as a variable
        const query = `
        WITH 
        lowest_yield AS (
          SELECT area_name, AVG(VALUE) AS avg_yield
          FROM "BRIAN.HOBLIN".crop_data
          WHERE ITEM_NAME LIKE '${itemName}' AND element_code = 5419
          GROUP BY area_name
          ORDER BY avg_yield ASC
          FETCH FIRST 3 ROWS ONLY
        ),
        highest_yield AS (
          SELECT area_name, AVG(VALUE) AS avg_yield
          FROM "BRIAN.HOBLIN".crop_data
          WHERE ITEM_NAME LIKE '${itemName}' AND element_code = 5419
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
          WHERE ITEM_NAME LIKE '${itemName}' AND element_code = 5510
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
  
  // Helper Queries

  app.get('/crop-area-names', (req, res) => {
    async function cropAreaNames() {
      try {
        const connection = await oracledb.getConnection();
  
        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
  
        // Add the SQL query as a variable
        const query = `select distinct(area_name) from "BRIAN.HOBLIN".crop_data order by area_name`;
  
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
    cropAreaNames()
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  
  app.get('/crop-years', (req, res) => {
    async function cropAreaNames() {
      try {
        const connection = await oracledb.getConnection();
  
        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
  
        // Add the SQL query as a variable
        const query = `select distinct(year) from "BRIAN.HOBLIN".crop_data order by year`;
  
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
    cropAreaNames()
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  app.get('/crop-items', (req, res) => {
    async function cropItems() {
      try {
        const connection = await oracledb.getConnection();
  
        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
  
        // Add the SQL query as a variable
        const query = `select distinct(item_name) from "BRIAN.HOBLIN".crop_data order by item_name`;
  
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
    cropItems()
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  app.get('/crop-ecode', (req, res) => {
    async function cropItems() {
      try {
        const connection = await oracledb.getConnection();
  
        oracledb.outFormat = oracledb.OUT_FORMAT_ARRAY;
  
        // Add the SQL query as a variable
        const query = `select distinct(element_code) from "BRIAN.HOBLIN".crop_data order by element_code`;
  
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
    cropItems()
      .then((dbRes) => {
        res.send(dbRes);
      })
      .catch((err) => {
        res.send(err);
      });
  });

init_database();