/*
Providing helper functions to help other function is access
user related information  
*/


/***************Import Internal Modules****************** */
const userDB  = require('../../models/userDB'); 

const userHelper = {

    isExistingEmail: async(email)=>{

        try{
            const response = await userDB.findByEmail(email);
            return response ? true : false;
        }catch(err){
            //Internal Log 
            console.log(
                `
                Error in User Helper Function/ Existing Email Checking.
                Input: 
                email: ${email}
                error: ${err}
                `);
            throw new Error();
        }
    }

}

module.exports = userHelper