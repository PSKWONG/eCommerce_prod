/***************Import external Modules****************** */
const bcrypt = require("bcrypt");
const generator = require('generate-password');





const securityHelperFunctions = {

    //Apply Bcrypt for password encryption 
    passwordencryption: async (password) => {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        return encryptedPassword;
    },

    //Comparing password 
    isPasswordMatched: async (password, hash) => {
        if (!password || !hash) {
            return false;
        }
        return await bcrypt.compare(password, hash);
    },

    //Generate random Password 
    generatePassword: () => {

        //Password Criteria
        const criteria = {
            length: 12,
            numbers: true,
            symbols: true,
            uppercase: true,
            excludeSimilarCharacters: true,
        }

        return generator.generate(criteria);

    }

}


module.exports = securityHelperFunctions




