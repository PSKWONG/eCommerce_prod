/*
Helper function on Checking USER INPUTS
    - Sign UP (Create) Checking 
Helper function on Checking Product INPUTS
*/

/***************Import external Modules****************** */
const { checkSchema, validationResult } = require('express-validator');

/***************Import Internal Modules****************** */
const basicSchema = require('./basicSchema');


/*************** Validation for Request ****************** */

const requestInputValidation = {

    users: {
        create: { ...basicSchema.users },
        update: {
            'userName': {
                optional: true,
                ...basicSchema.users['userName']
            },
            'email': {
                optional: true,
                ...basicSchema.users['email']
            },
            'password': {
                optional: true,
                ...basicSchema.users['password']
            },

        }
    },
    products:{
        listing: {...basicSchema.products}
    },

    getValidationErrors: async (schema, inputs) => {

        const checkingObject = { body : inputs }
        await checkSchema(schema).run(checkingObject);
        return validationResult(checkingObject).array();

    }

}


module.exports = requestInputValidation; 