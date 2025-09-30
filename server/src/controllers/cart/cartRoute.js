/***************Import external Modules****************** */
const express = require('express');
const cartRouter = express.Router();

/***************Import Internal Modules****************** */
const cartController = require('./cartController'); 

cartRouter.put('/sync', cartController.sessionSync ,  cartController.cartDBSync, cartController.exportSyncResult  ); 

/*********** Export Modules **************** */
module.exports = cartController; 