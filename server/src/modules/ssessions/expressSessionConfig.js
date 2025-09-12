/********Import External Modules ****** */
const path = require('path');
const session = require("express-session")
const { pool } = require('../../models/db'); 
const pgSession = require('connect-pg-simple')(session);

/********Server Session Config  ****** */

const sessionContent = session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        secure: process.env.NODE_ENV === 'development' ? false : true, // true in production with HTTPS
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    },
    store: new pgSession({
        pool: pool, // Connection pool
        tableName: 'sessions', // Use the session table created above
    })
});

module.exports = sessionContent; 