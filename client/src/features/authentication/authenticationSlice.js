/***************Import External Modules****************** */
import { createSlice } from '@reduxjs/toolkit';


/*
Redux Store to facilitate Authentication Function in this site
## Function 
- Check the Authentication Status 
- Centralise Authentication Status 
    * Sign Up 
    * Login 
    * Logout 
- Centralise Authentication Error Message
    * Sign Up 
    * Login 
    * LogOut 
- Store user Information and Preference 
*/

//Initial State Template for Authentication
const authenState = {
    data: {
        userInfo: null,
        message:[]
    },
    status: {
        isAuthen: false,
        isLoading: false,
        isError: false,
    }
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: authenState,
    reducers:{
        setErrorMsg: (state,action)=>{
            state.data.message = action.payload; 
        }
    }
})

//Export Reducer to Store 
export default authenticationSlice.reducer;

//Export Actions 
export const { 
    setErrorMsg 
} = authenticationSlice.actions;

//Export Store State
export const {
    selectAuthenStatus,
    selectAuthenLoadingStatus,
    selectUserInfo,
    selectErrorMsg
} = authenticationSlice.selectors;