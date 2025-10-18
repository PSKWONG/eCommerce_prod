/*
Middleware for handling data checking
## Logic 
* upload requried object with " Reference " & " Data"
* Get the server response 
*/


/***************Import External Modules*******************/
import { createAsyncThunk } from '@reduxjs/toolkit';

/***************Import Internal Modules*******************/
import api from '../../../api/apiConnector';
import process from '../data/menuItems.json';




const dataChecking = createAsyncThunk(
    'order/dataChecking',
    async (section, thunkAPI) => {

        //Get the API function
        const state = thunkAPI.getState();
        //const dispatch = thunkAPI.dispatch;


        /*************** Checking of input ****************** */
        //console.log(`Get the data from current Index: ${JSON.stringify(indexChecker, null, 2)}`);


        /*************** Get Order Store data ****************** */
        const orderStoreData = state?.order?.data?.orderData ?? {};
        const sectionData = orderStoreData[section] ?? null;

        //Checking
        console.log(`Order Store Data ${JSON.stringify(orderStoreData, null, 2)}`)


        try {

            //Posting data to API Server 
            const response = await api.post('/order/dataChecking', { section, sectionData });
            const { success, data } = response;

            //Checking
            console.log(`Order Response Checking: ${JSON.stringify(response, null, 2)} `)

            //If data checking is success, move to the path of next index 
            if (success) {
                return;
            } else {

                //Internal Log 
                console.log(`
                    Error in Order / Data Checker
                    Input : 
                        * Secion : ${JSON.stringify(section, null, 2)}  
                        * Section Data : ${JSON.stringify(sectionData, null, 2)}   
                    Error Message: 
                        * ${JSON.stringify((data?.message ?? ''), null, 2)}
                `);

                //Set Error Message to slice 
                return thunkAPI.rejectWithValue(data?.message ?? []);
            }


        } catch (err) {
            //Internal Log 
            console.log(`
                    Error in Order / Data Checker
                    Input : 
                        * Secion : ${JSON.stringify(section, null, 2)}   
                        * Section Data : ${JSON.stringify(sectionData, null, 2)}   
                    Error : ${JSON.stringify(err, null, 2)}
                `);

            //Set Error Message to slice 
            return thunkAPI.rejectWithValue(['Internal Error. Please try again later.']);
        }
    }

)

export default dataChecking;

