/*
Middleware for handling progress forwarding 
## Logic 
* Invoke Data Checking 
* Invoke Progress Checking 
* Make the decision on whether make the progress forward 
*/


/***************Import External Modules*******************/
import { createAsyncThunk } from '@reduxjs/toolkit';

/***************Import Internal Modules*******************/
import dataChecking from './dataChecking';
import progressChecking from './progressChecking';




const progressHandler = createAsyncThunk(
    'order/progressHandler',
    async (input, thunkAPI) => {

        //Get the API function
        const dispatch = thunkAPI.dispatch;

        //Get the data from Imported Data 
        const {currentIndex, progressGuide} = input?? {} 

        //Get the data from index Checker 
        const section = progressGuide[currentIndex].ref ?? null

        //Invoke Daat Checking 
        await dispatch(dataChecking(section));

        //Invoke Progress Checing 
        await dispatch(progressChecking());

        //Get the data from store 
        const state = thunkAPI.getState();
        const progressData = state?.order?.data?.progressChecking ?? null;
        const isDataVild = progressData[currentIndex]; 
        return isDataVild; 

    }

)

export default progressHandler;

