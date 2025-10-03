/********* Import Internal Modules *********** */
const localPool = require('../modules/database/localDB').pool; 
const neonPool = require('../modules/database/neonDB').pool; 

//Conditional Pool Selection
const environment = process.env.NODE_ENV || 'development';
const pool = environment === 'development' ? localPool : neonPool ; 

//Create a function "query" for executing SQL queries
const dbQuery = async (sqlQuery, params = []) => {
    const result = await pool.query(sqlQuery, params);
    return result;
}

/********* Export Modules *********** */
//Export both 
// - Pool > Conenct with the Database 
// - dbQuery > Put SQL to execute 
module.exports = { pool, dbQuery };