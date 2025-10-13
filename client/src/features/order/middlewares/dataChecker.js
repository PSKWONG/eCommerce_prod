/*
Middleware for handling data checking
## Logic 
* upload requried object with " Reference " & " Data"
* Get the server response 
*/


/***************Import External Modules*******************/
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

/***************Import Internal Modules*******************/
import api from '../../../api/apiConnector';
import { selectOrderData } from '../orderSlice';



const dataChecking = createAsyncThunk(

    'order/dataChecking',
    async (currentIndex, thunkAPI) => {

        //Get the API function
        //const state = thunkAPI.getState;
        //const dispatch = thunkAPI.dispatch;

        /*************** Get Order Store data ****************** */
        const orderStoreData = useSelector(selectOrderData) ?? {};
        const section = process[currentIndex] ?? null;
        const sectionData = orderStoreData.section ?? null;


        try {

            const response = await api.post('/order/dataChecking', { section, sectionData });
            const { success, data } = response;

            if (success) {
                return true;
            } else {

                //Internal Log 
                console.log(`
                    Error in Order / Data Checking 
                    Input : 
                        * Secion : ${section}
                        * Section Data : ${JSON.stringify(sectionData, null, 2)}   
                    Error Message: 
                        * ${JSON.stringify((data?.message ?? ''), null, 2)}
                `);
                return thunkAPI.rejectWithValue(data.message);
            }


        } catch (err) {
            //Internal Log 
            console.log(`
                    Error in Order / Data Checking 
                    Input : 
                        * Secion : ${section}
                        * Section Data : ${JSON.stringify(sectionData, null, 2)}   
                    Error : ${JSON.stringify(err , null, 2)}
                `);
            return thunkAPI.rejectWithValue(['Internal Error. Please try again later.']);
        }
    }

)

export default dataChecking;

