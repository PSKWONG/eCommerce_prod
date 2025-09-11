/********* Import External Modules *********** */


/********* Import Internal Modules *********** */
const responseConstructor = require('../../modules/constructors/responseConstructor'); 


/*
Custom Middlewares for handling Server Errors
- Server Errors (5xx): Database failures, unhandled exceptions, timeouts. 
*/

const customErrorHandler = (err, req, res, next) => {

    // Internal Log for the Error
    console.error(`[${req.method}] ${req.url} →`, err.message);

    //Preparation for response (Internal Error) to front-end 
    const response = responseConstructor(); 
    const status = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error. Please try again later.'; 
    response.setMessage(errorMessage)

    //Response for API client 
    res.status(status).json(response.build())

}

module.exports = customErrorHandler