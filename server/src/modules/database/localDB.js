/********Import External Modules ****** */

/*
use of "pg" for PostgreSQL connection 
- reference : https://www.npmjs.com/package/pg 
*/

const { Pool } = require('pg');
const path = require('path'); 

//Create NEW Pool for PostgreSQL Conenction 
const pool = new Pool({
    connectionString: process.env.DATABASE_LOCAL
});

module.exports = { pool };
