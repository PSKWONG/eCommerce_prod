/*
Basic Schema for Input to check
- It covers the parameters to pass to the controller

##

## Output
- An object pass to the "express-validator" for input checking 
- Basic struture of object 
    * Each key in the object represents a field name
        Depedns on the layer structure of the request object 
        e.g. 'user.email' || 'email' 
    * Each value is another object that defines the validation rules for that field
        Here is some commone validator / santiliser to use 
        - escape: true : sanitizer that helps protect your app from injection attacks like Cross-Site Scripting (XSS); 
        - notEmpty : 
        - bail() : it tells the validator to stop running further validations on a field as soon as one fails.

*/
/***************Import Internal Modules****************** */
const userHelper = require('../../controllers/user/userControllerHelper');

/* 
*************Helper function - Field Standised Checking *******************
*/
const textFieldChecking = (fieldName) => {

    return {
        exists: {
            errorMessage: `${fieldName} cannot be empty`,
            bail: true
        },
        escape: true,
        notEmpty: {
            errorMessage: `${fieldName} cannot be empty`,
            bail: true
        }
    }
}

const emailFieldChecking = (fieldName) => {

    return {
        exists: {
            errorMessage: `${fieldName} cannot be empty`,
            bail: true
        },
        normalizeEmail: true,
        notEmpty: {
            errorMessage: `${fieldName} cannot be empty`,
            bail: true
        },
        isEmail: {
            errorMessage: `${fieldName} is not valid`
        }
    }
}

const passwordFieldChecking = (fieldName) => {

    //Only check the New Password 

    return {
        exists: {
            errorMessage: `${fieldName} cannot be empty`,
            bail: true
        },
        notEmpty: {
            errorMessage: `${fieldName} cannot be empty`,
            bail: true
        },
        isLength: {
            options: { min: 16, max: 50 },
            errorMessage: `${fieldName} must be at least 16 characters`,
            bail: true
        },
        matches: {
            options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{16,50}$/,
            errorMessage: `${fieldName} must include uppercase, lowercase, number, special character (@$!%*?&)`
        }

    }
}

const integerChecking = (fieldName) => {

    return {
        [fieldName]: {
            in: ['body'],
            trim: true, // removes leading/trailing whitespace
            toInt: true, // converts to integer
            isInt: {
                errorMessage: `${fieldName} must be a whole number`
            }
        }
    }
}


/* 
************* Basic Schema for different Controllers  *******************
*/


const basicSchema = {

    //Setting for User Validation 
    users: {
        'userName': {
            ...textFieldChecking('User Name')
        },
        'email': {
            ...emailFieldChecking('Registering email'),
            custom: {
                options: async (value) => {
                    //Custom Actions 
                    try {
                        if (await userHelper.isExistingEmail(value)) {
                            throw new Error('Email is already existed.')
                        }
                        return true;
                    } catch (err) {
                        throw new Error(err.message);
                    }
                }
            }
        },
        'password': {
            ...passwordFieldChecking('Password')
        }
    },
    products:{
        'categoryId':{
            optional: true,
            ...integerChecking('Category ID')
        },
        'productID':{
            ...integerChecking('Product ID')
        }
    }

};

module.exports = basicSchema; 