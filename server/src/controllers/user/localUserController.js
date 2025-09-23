/*
User Controller 
## Aim: 
Handle information for actions related to User databse
- Creating User 
*/

/***************Import Internal Modules****************** */
const userDB = require('../../models/userDB');
const requestValidation = require('../../modules/validator/requestValidator');
const responseConstructor = require('../../modules/constructors/responseConstructor');
const securityHelper = require('../security/securityHelperFunctions');


const localUser = {

    create: async (req, res, next) => {

        // Construct Response Object
        const response = responseConstructor();

        // Run validations for each section
        const inputs = req.body.users || req.body;
        const schema = requestValidation.users.create;
        const validationErrors = await requestValidation.getValidationErrors(schema, inputs);

        //## Edge Case - Validation is not passed; 
        if (validationErrors?.length > 0) {

            validationErrors.forEach(({ msg }) => {
                response.setMessage(msg);
            })

            //Return the reponse with status code and response objects 
            console.log(`
                Validation Errors: User / Create 
                Input: ${JSON.stringify(inputs, null, 2)},
                Error: ${JSON.stringify(validationErrors, null, 2)}
                `)
            return res.status(400).json(response.build());
        }


        // Create NEW user through execute queries in mdoles 
        try {

            //Destructuring the request body
            const { username, email, password } = inputs;

            //Encrypt the password
            const encryptedPassword = await securityHelper.passwordencryption(password);

            //Set the flag for local User
            const islocal = req.isLocal ?? true;

            //Execute Query for user creation 
            const newUser = await userDB.create(username, email, encryptedPassword, islocal);

            //Pass user information to next Middleware
            req.newUser = newUser;

            next();

            return;

        } catch (err) {

            //Internal Error Log
            console.log(`
                Error in controller: localUSer / create 
                Input: ${inputs},
                Error: ${err}
                `
            )

            next(err); 

            return; 
        }


    }


}

module.exports = localUser; 