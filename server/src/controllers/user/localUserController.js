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
        const inputs = req?.body?.users || req?.body;
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
            const { email, password } = inputs;
            let { userName } = inputs;
            if (!userName) {
                userName = `Default User`;
            }

            //Encrypt the password
            const encryptedPassword = await securityHelper.passwordencryption(password);

            //Set the flag for local User
            const islocal = req.isLocal ?? true;

            //Execute Query for user creation 
            const newUser = await userDB.create(userName, email, encryptedPassword, islocal);

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


    },
    update: async (req, res, next) => {

        // Construct Response Object
        const response = responseConstructor();

        // Run validations for each section
        const inputs = req?.body?.users || req?.body;
        const schema = requestValidation.users.update;
        const validationErrors = await requestValidation.getValidationErrors(schema, inputs);


        //## Edge Case - Validation is not passed; 
        if (validationErrors?.length > 0) {

            validationErrors.forEach(({ msg }) => {
                response.setMessage(msg);
            })

            //Return the reponse with status code and response objects 
            console.log(`
                Validation Errors: User / Update 
                Input: ${JSON.stringify(inputs, null, 2)},
                Error: ${JSON.stringify(validationErrors, null, 2)}
                `)
            return res.status(400).json(response.build());
        }

        // Update user information through execute queries in mdoles 
        //Prepare information for updating user info

        //Get user ID
        const id = req?.user?.id ?? null;
        if (!id) {
            response.setMessage(`Fail to get the user authentication.`);
            res.status(400).json(response.build());
        }

        //Get username
        const username = req.body?.user?.userName ?? req.user.user_name;
        const email = req.body?.user?.email ?? req.user.email;
        const password = req.body?.user?.password ? await securityHelper.passwordencryption(req.body.user.password) : req.user.password;
        const islocal = req.user.isLocal ?? true;


        try {

            //Call Query for updating user information  
            const updatedUser = await userDB.updateUserInfo(id, email, username, password, islocal);

            if (!updatedUser) {
                //Local log 
                console.log(`
                    Error in Local User / Update / Cannot retrieve the user update 
                    #Input: 
                        User Name: ${username}
                        Email: ${email}
                        Password: ${password}
                        isLocal: ${islocal}
                    
                    `);
                response.setMessage(`Fail to update the user update`);
                res.status(400).json(response.build());
                return;
            }

            //Response Construction 
            response.setPath('/user');
            return res.status(200).json(response.build());

        } catch (err) {
            //Local log 
            console.log(`
                    Unexpected Error in Local User / Update 
                    #Input: 
                        User Name: ${username}
                        Email: ${email}
                        Password: ${password}
                        isLocal: ${islocal}
                    #Error: ${err}
                    `);
            next(err);
            return 
        }
    },
    getUser: async (req, res, next) => {

        //Start get user info
        const sessionUser = req.user

        //Construct the return user info 
        delete sessionUser.password

        // Construct Response Object
        const response = responseConstructor();
        response.setInfo('users', sessionUser);

        res.status(200).json(response.build());

    }



}

module.exports = localUser; 