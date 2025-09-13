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
                )

                return next(new Error)
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
                    return next();

                }
            )(req, res, next)
        }
    },

    autoLogin: (req, res, next) => {

        //Get the user Infromation 
        const user = req.authenticatedUser;

        //Response Constructor 
        const response = responseConstructor();

        req.login(user, (err) => {

            if (err) {
                return next(err);
            }

            //Axios Response 
            response.setPath(process.env.AUTH_SUCCESS_URL);
            return res.status(200).json(response.build());

        })
    },

    logOut: (req, res) => {

        const response = responseConstructor();

        req.logOut(() => {
            //LogOut Call back function 
            response.setPath('/');
            return res.status(200).json(response.build());
        })
    },

    checking: (req, res, next) => {

        const response = responseConstructor();

        //Checking 
        //console.log('Cookies:', req.cookies);
        //console.log('Session:', req.session);
        //console.log('User:', req.user);

        //Deserialization of passport is initiated to check
        if (req.isAuthenticated()) {
            return next();
        }

        //Axios Response 
        response.setPath(process.env.AUTH_FAILURE_URL);
        return res.status(400).json(response.build());
    },

    successAuthen: (req, res, next) => {
        const response = responseConstructor();
        response.setMessage('Successfully Logging In')
        res.status(200).json(response.build());
    }

}

module.exports = authenticationController; 