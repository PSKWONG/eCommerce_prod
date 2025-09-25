/***************Import external Modules****************** */
const LocalStrategy = require('passport-local').Strategy;

/***************Import Internal Modules****************** */
const userDB = require('../../../models/userDB');
const securityHelpers = require('../securityHelperFunctions');

/*
How Local Strategy handle the Local Authentication
Ref: https://www.npmjs.com/package/passport-local 
*/

const localPassport = (passport) => {

    /*************** Configuration on Local Strategy ****************** */
    const localConfig = { usernameField: 'email' }

    /*************** Logic of the Local Strategy ****************** */
    const handleLocalAuthetication = async (email, password, done) => {

        try {

            //Look up the database 
            const user = await userDB.findByEmail(email); //User will be "null" if user cannot be found from database

            //###### Edge Case : User cannot be found in the User Database ###########
            if (!user) {
                return done(null, false, { message: 'No user can be found' });
            }

            //Checking the password             
            const isMatchedPassword = securityHelpers.isPasswordMatched(password, user?.password);

            //###### Edge Case : Password is not matched ###########
            if (!isMatchedPassword) {
                return done(null, false, { message: 'Password and Email provided are not matched' });
            }

            //Successfully Pass the Local Authenticaiotn 
            //User Information ( Retrieved from User Database) is passed along for case handling
            return done(null, user);

        } catch (err) {

            // Server Log 
            console.log(
                `
                Unexpected Error in Authentication: Local Authentication 
                Input: 
                    - email${email}
                    - password: N/A 
                Error: ${err}
                `
            )

            return done(err)

        }
    }

    passport.use(new LocalStrategy(localConfig, handleLocalAuthetication));



}

module.exports = localPassport