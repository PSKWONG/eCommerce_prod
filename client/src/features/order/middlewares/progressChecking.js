/*
Middleware for handling order progress checking
## Logic 
* upload checking template to server 
* Get the server response 
* Update the Store 
*/


/***************Import External Modules*******************/
import { createAsyncThunk } from '@reduxjs/toolkit';

/***************Import Internal Modules*******************/
import api from '../../../api/apiConnector';
import orderProcess from '../data/menuItems.json';



const progressChecker = createAsyncThunk(

    'order/progressChecking',
    async (input, thunkAPI) => {

        //Get the API function
        //const state = thunkAPI.getState;
        //const dispatch = thunkAPI.dispatch;

        //Prepare the checking template ( Checking Items for Server )
        const checkingTemplate = (() => {

            //Empty Array initiation 
            const templateArray = [];

            //According to the structure of progress, extract the identify reference 
            (orderProcess ?? []).forEach((step) => {
                templateArray.push(step.ref)
            });

            //Checking 
            console.log(`Data Checking Tempalte for server: ${JSON.stringify(templateArray, null, 2)}`)

            return templateArray;
        })();


        try {

            const response = await api.post('/order/progress', { template: checkingTemplate });

            const { success, data } = response;

            if (success) {
                return data?.info?.order ?? null;
            } else {
                console.log(
                    `
                Error in Order / Progress Checking 
                #Input: ${JSON.stringify(checkingTemplate, null, 2)}
                #Error: ${data.message}
                `
                );

                throw new Error('The server is unavaliable. Please try again later.');

            }


        } catch (err) {
            console.log(
                `
                Error in Order / Progress Checking 
                #Input: ${JSON.stringify(checkingTemplate, null, 2)}
                #Error: ${err}
                `
            );
            throw new Error('The server is unavaliable. Please try again later.')
        }



    }

)

export default progressChecker;

