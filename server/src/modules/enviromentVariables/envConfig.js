/********Import External Modules ****** */
const path = require('path');

/*
Import module of "dotenv-flow"
- Manage the use enviroment variable 
- detail reference : https://www.npmjs.com/package/dotenv-flow
*/

require('dotenv-flow').config({
  path: path.resolve(__dirname, '../../../'),
  nodeEnv: process.env.NODE_ENV
});