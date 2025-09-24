/*
Thunk for Authentication Checking
- Fetch a GET request to API server to checking the authentication status 
- Set the states of redux store according to the response
*/


/***************Import External Modules****************** */
import { createAsyncThunk } from '@reduxjs/toolkit';

/***************Import Internal Modules****************** */
import api from '../../../api/apiConnector';

const authenChecking = createAsyncThunk(
    'authentication/checking',
    async (data, thunkAPI) => {
        
        //Make a GET request to API Server
        try{

            const response = await api.get('/authen/checking');

            const {success , data } = response; 
            return {
                success, 
                message: data?.message ?? []
            }

        }catch(err){
            //Internal Log 
            console.log(
                `
                Error in Authentication / Checking Thrunk 
                Error: ${err}
                `
            ); 
            throw new Error('Server Error. Please try again later.');
        }
    }
)

export default authenChecking; 