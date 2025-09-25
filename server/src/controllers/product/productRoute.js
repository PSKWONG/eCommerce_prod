/***************Import external Modules****************** */
const express = require('express');
const productRouter = express.Router();

/***************Import Internal Modules****************** */
const productController = require('./productController'); 


productRouter.post('/list', productController.filteredByCategoryID ); 
productRouter.get('/list', productController.getProductListbyCategoryID ); 




/*********** Export Modules **************** */
module.exports = productRouter; 