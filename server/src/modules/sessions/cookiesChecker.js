/*
Controller for checking the avaliability of cookies
*/

/***************Import Internal Modules****************** */
const responseConstructor = require('../constructors/responseConstructor'); 


const cookiesValidator = {

    check: (req, res, next) => {

        //Response Constructor 
        const response = responseConstructor()

        if (!req.headers.cookie) {
            console.warn('[Cookie Check] No cookie header received—client may be blocking cookies.');
            response.setMessage('Cookies are blocked. Please check the setting of browser.')
            res.status(400).json(response.build()); 
        }
        next();

    }

}

module.exports = cookiesValidator; 