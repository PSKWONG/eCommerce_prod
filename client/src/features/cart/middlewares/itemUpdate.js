/*
Middleware for handling cart data update 
## Logic 
* Get Local Data 
* Upload to the server for processing
*   Return with updated Data 
* Update the Local Storage 
* send to store for further action 
*/


/***************Import External Modules****************** */
import { createAsyncThunk } from '@reduxjs/toolkit';

/***************Import Internal Modules****************** */
import { updateItem, deleteItem } from '../cartSlice'; 
import loadAndSync from '../middlewares/loadAndSync'; 

const itemUpdater = createAsyncThunk(

    'cart/itemUpdate',
    async (item, thunkAPI) => {

        //Get the function
        const state = thunkAPI.getState;
        const dispatch = thunkAPI.dispatch;

        //Data Checking
        const product = item?.product ?? null;
        const quantity = item?.quantity ?? null;

        if (!product || quantity === null) { // Throw Error when it is not able to pass the input checking 
            console.log(
                `
                    Error in Cart | Items Updater  | Information is missing 
                    #Input : ${item}
                `
            );
            throw new Error('Input is incomplete');
        }

        //Item Update
        if (quantity > 0) {
            //updateItem: Action for the store 
            dispatch(updateItem({ product, quantity }));
        }else{
            dispatch(deleteItem({ product }));
        }

        //Get latest cart data
        const updatedCartData = state().cart.data; 

        //Load and Sync 
        dispatch(loadAndSync(updatedCartData)); 

    }

)

export default itemUpdater;

