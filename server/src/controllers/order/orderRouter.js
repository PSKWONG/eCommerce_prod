/***************Import external Modules****************** */
const express = require('express');
const orderRouter = express.Router();

/***************Import Internal Modules****************** */
const orderController = require('./orderController'); 
//const authentication = require('../security/passport/passportAuthentication');


orderRouter.post('/progress', orderController.progressChecking);
orderRouter.post('/dataChecking', orderController.dataChecking);


/*********** Export Modules **************** */
module.exports = orderRouter; 