/*
Middleware for handling order cancelling
## Logic 
* Trigger clearance of data of server 
* If success, clearance of local store 
*/


/***************Import External Modules*******************/
import { createAsyncThunk } from '@reduxjs/toolkit';

/***************Import Internal Modules*******************/
import api from '../../../api/apiConnector';
import process from '../data/menuItems.json';
import { resetOrder } from '../orderSlice';




const orderCancelling = createAsyncThunk(
    'order/cancelOrder',
    async (actions, thunkAPI) => {

        //Get the API function
        const state = thunkAPI.getState();
        const dispatch = thunkAPI.dispatch;


        try {

            //Posting data to API Server 
            const response = await api.post('/order/cancel');
            const { success } = response;

            //Checking
            console.log(`Order Response / Cancelling : ${JSON.stringify(response, null, 2)} `)

            //If success, start clear store 
            if (success) {
                dispatch(resetOrder());
                return true;
            } else {
                //Internal Log 
                console.log(`
                    Error in Order / Cancelling
                    Error : 'Error in handling order cancelling in server'
                `);
                //Set Error Message to slice 
                return thunkAPI.rejectWithValue(['Internal Error. Please try again later.']);

            }

        } catch (err) {
            //Internal Log 
            console.log(`
                    Error in Order / Cancelling
                    Error : ${JSON.stringify(err, null, 2)}
                `);
            //Set Error Message to slice 
            return thunkAPI.rejectWithValue(['Internal Error. Please try again later.']);
        }
    }

)

export default orderCancelling;

