/********* Import Internal Modules *********** */
const {pool} = require('../modules/database/localDB'); // Connect with the Database connection module



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