/********* Import External Modules *********** */
require('./modules/enviromentVariables/envConfig'); //Enviroment Variable Configuration
const express = require('express');
const path = require('path');
const passport = require('passport'); // Import "Passport" Module 
const errorhandler = require('errorhandler'); // Error handler in development environment


/********* Import Internal Modules *********** */
const userRouter = require('./controllers/user/userRouter'); 
const authenRouter = require('./controllers/security/autheticationRouter'); 
const productRouter = require('./controllers/product/productRoute'); 
const cartRouter = require('./controllers/cart/cartRoute');
const orderRouter = require('./controllers/order/orderRouter'); 
const customErrorHandler = require('./controllers/responseHandler/customErrorHandler');  // Configuration on Custom Error Handler
const sessionContent = require('./modules/sessions/expressSessionConfig'); //Session module with configuration 





/********* Server Basic Middlewares *********** */
// Server Basic Setting 
const app = express();

// Server Logging the request 
const morgan = require('morgan');
app.use(morgan('tiny'));

// Server automatically parise the request body
const bodyParser = require('body-parser');
app.use(bodyParser.json())

/*********** Session **************** */
app.use(sessionContent);

/*********** Passport  **************** */
require('./controllers/security/passport/passportConfig')(passport); // Apply Passport Configuration
app.use(passport.initialize());
app.use(passport.session());


/********* Serve FrontEnd files *********** */
//Serve a static websiste from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

//The * symbol will match any route that is not matched by other middleware
//This will allow React routes to work
app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

/*********** API Routing **************** */
//Note: Client API will have a base /api/ for API routing 
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/authen', authenRouter);
app.use('/api/order',orderRouter)



/*********** Error Handling Modules **************** */


if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler());
} else {
    app.use(customErrorHandler);
}


/*********** Export Modules **************** */
module.exports = app; 