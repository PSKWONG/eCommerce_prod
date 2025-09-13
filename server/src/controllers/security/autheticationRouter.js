/***************Import external Modules****************** */
const express = require('express');
const authenRouter = express.Router();

/***************Import Internal Modules****************** */
const authentication =require('./passport/passportAuthentication');

authenRouter.post('/login/local', authentication.applyPassportStrategy('local'), authentication.autoLogin );
authenRouter.post('/logout', authentication.logOut); 
authenRouter.get('/checking', authentication.checking, authentication.successAuthen);


module.exports = authenRouter; 


