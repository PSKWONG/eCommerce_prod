/***************Import external Modules****************** */
const express = require('express');
const userRouter = express.Router();

/***************Import Internal Modules****************** */
const localUserController = require('./localUserController');
const authentication = require('../security/passport/passportAuthentication');


userRouter.post('/local/create', localUserController.create, authentication.autoLogin);
userRouter.put('/local/update', authentication.checking, localUserController.update, localUserController.getUser);
userRouter.get('/profile', authentication.checking,localUserController.getUser); 



/*********** Export Modules **************** */
module.exports = userRouter; 