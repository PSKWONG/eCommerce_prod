

/***************Import Internal Modules****************** */
const { pool, dbQuery } = require('../../models/db');

/********** Clear the Testing DB ****************** */
const dbHelper = {

    clear: async (db) => {

        //Set DB allowed foe trucate 
        const allowedDB = ['users'];

        //Checking: If the db input is not in the list throw Error
        if (!allowedDB.includes(db)) {
            throw new Error('Check the name of Database. The action is not allowed for selected database')
        }

        //Start the clear DB queries 
        await dbQuery(`TRUNCATE TABLE ${db} RESTART IDENTITY CASCADE`, []);

    },

    end: async () => {
        await pool.end();
    }

}


module.exports = dbHelper; 
