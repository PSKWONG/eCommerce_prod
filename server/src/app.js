/********* Import External Modules *********** */
//require('dotenv-flow').config(); 
require('./modules/enviromentVariables/envConfig'); //Enviroment Variable Configuration
const express = require('express');
const path = require('path');

/********* Import Internal Modules *********** */


/********* Server Basic Middlewares *********** */
// Server Basic Setting 
const app = express();


/********* Serve FrontEnd files *********** */
//Serve a static websiste from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));

//The * symbol will match any route that is not matched by other middleware
//This will allow React routes to work
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});



/*********** Export Modules **************** */
module.exports = app; 