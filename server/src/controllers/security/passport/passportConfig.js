/***************Import external Modules****************** */


/***************Import Internal Modules****************** */
const userDB = require('../../../models/userDB'); 
const localStrategy = require('./local');


/*
This file store the configuration(connection) of passport
- The strategy implemented
- The logic to handle the authentication 
- User ID is used as the reference for authentication 
*/

/*
## Passport Strategy Error Format
- Always use: `done(null, false, { message: '...' })`
- Avoid passing raw strings—breaks consistency
- `info.message` used in custom callback for error handling
*/

const passportConfig = (passport) => {

    /***************Basic Operation: Serialization with Session ****************** */
    passport.serializeUser((user, done) => done(null, user.id));

    /***************Basic Operation: Deserialization with Session ****************** */
    //Get information from User database with input of userID
    passport.deserializeUser(async (id, done) => {

        try {

            // lookup user by User ID
            const user = await userDB.findById(id);

            //If user cannot be located in database 
            if (!user) {
                return done(null, false, { message: 'No user can be found' });
            }

            //If user can be found in database
            done(null, user);

        } catch (err) {
            return done(err);
        }


    })

    /*************** Strategy to be adapted  ****************** */
    localStrategy(passport);



}

module.exports = passportConfig; 