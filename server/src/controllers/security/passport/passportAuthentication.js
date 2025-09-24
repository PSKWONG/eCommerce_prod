/***************Import external Modules****************** */
const passport = require('passport');

/***************Import external Modules****************** */
const responseConstructor = require('../../../modules/constructors/responseConstructor');

const availableStrategies = ['local', 'facebook'];

const authenticationController = {

    /*
    */

    applyPassportStrategy: (strategy) => {

        return (req, res, next) => {

            //########## Edge Case: Wrong Strategy #################
            if (!availableStrategies.includes(strategy)) {
                //Internal Log for the error
                console.log(
                    `
                Error in Authentication Controller. 
                Reason: The strategy is not available. Please check the spelling of the strategy. 
                Available Strategies : ${availableStrategies.join(', ')}
                `
                );
                next(new Error);
                return;
            }

            passport.authenticate(
                strategy,
                (err, user, info) => {

                    const response = responseConstructor();

                    //************************ Case of failure *************************/
                    //########## Edge Case: Unexpected Error in Authentication  #################
                    if (err) return next(err);

                    //########## Edge Case: Fail to authenticate ( No user object returned)   #################
                    if (!user) {
                        response.setMessage(info.message || 'Authentication failed');
                        response.setPath(process.env.AUTH_FAILURE_URL);
                        return res.status(400).json(response.build());
                    }

                    //************************ Case of Success *************************/
                    //Pass the authenticated user Info to the next middlewre
                    req.authenticatedUser = user;
                    next();
                    return;

                }
            )(req, res, next)
        }
    },

    autoLogin: (req, res, next) => {

        //Get the user Infromation 
        const user = req.authenticatedUser || req.newUser;

        req.login(
            user,
            (err) => {

                //##### Edge Case - If Error occur during the login process, throw Error object 
                if (err) {
                    return next(err);
                }

                //Response Construction for success Login 
                const response = responseConstructor();
                response.setPath(process.env.AUTH_SUCCESS_URL);
                return res.status(200).json(response.build());

            }
        )
    },

    logOut: (req, res) => {

        req.logOut(() => {
            const response = responseConstructor();
            response.setPath('/');
            res.status(200).json(response.build());
            return;
        })
    },

    checking: (req, res, next) => {
        /*
        Checking the authentication Status 
        - Success: Continue the next middleware 
        - Failure: Return a failure response 
        //////////////// Logic /////////////////
        * req.isAuthenticated() is a passport.js function 
        which check whether [req.user] is existed; 
        */

        //Checking 
        //console.log('Cookies:', req.cookies);
        //console.log('Session:', req.session);
        //console.log('User:', req.user);

        //Passport Checking 
        if (req.isAuthenticated()) {
            next();
            return;
        }

        //## Edge Case - Failure on Authentication 
        const response = responseConstructor();
        response.setPath(process.env.AUTH_FAILURE_URL);
        response.setMessage('Page requested is restricted to authenticated user. Please singup / login.')
        res.status(400).json(response.build());
        return;
    },

    successAuthen: (req, res) => {

        //Response construction
        const response = responseConstructor();
        response.setMessage('Successfully Logging In');
        res.status(200).json(response.build());
        return;
    }

}

module.exports = authenticationController; 