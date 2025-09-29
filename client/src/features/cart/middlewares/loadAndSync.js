/*
Middleware for handling load and sync data of cart data 
## Logic 
* Get Local Data 
* Upload to the server for processing
*   Return with updated Data 
* Update the Local Storage 
* send to store for further action 
*/


/***************Import External Modules****************** */
import { createAsyncThunk } from '@reduxjs/toolkit';

/***************Import External Modules****************** */
import { cartDataTemplate } from '../cartSlice';
import api from '../../../api/apiConnector';



const loadAndSync = createAsyncThunk(

    'cart/localSync',
    async (local, thunkAPI) => {

        //Actions to use 
        const state = thunkAPI.getState();

        /*************** Get Local Data****************** */
        /*
        Try to get the local data from 
        - Local Storage - The initiation of local cart data ( if avaliable )
        - Updated cart data - The updated cart data from other middlewares ( if avaliable )
        - if no local data source is avaliable, empty cart data object will be used
            * Template is imported from cartSlice.js
            * They should be have the same structure as the slice 
        */
        const localData = (local || JSON.parse(localStorage?.getItem('cart'))) ?? null;
        const localList = localData?.cartList ?? null;


        /*************** Upload to Remote ****************** */
        let remoteList = null;


        try {
            const response = await api.put('/cart/sync', { localList });
            const { success, status, data } = response;

            if(success){
                remoteList = data?.info?.cart ?? null;
            }

        } catch (err) {
            console.log(
                `
                Error in Cart / Load and Sync 
                #Input: ${localData}
                #Error: ${err}
                `
            )
        }

        /*************** Updated Data ****************** */

        const updatedData = {
            ...(localData ?? cartDataTemplate ) ,
            cartList: ( remoteList || localList ) ?  ( remoteList || localList ) : {...cartDataTemplate.data}
        }

        /*************** Update Local Storage ****************** */
        localStorage.setItem('cart', JSON.stringify(updatedData));

        /*************** Export to store  ****************** */
        return updatedData;

    }
);

export default loadAndSync; 