/***************Import External Modules****************** */
import { createSlice } from '@reduxjs/toolkit';


/***************Import Internal Modules****************** */
import authenticationStatusChecking from './helperFunctions/authenticationChecking';


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
        message: []
    },
    status: {
        isAuthen: null,
        isLoading: false,
        isError: false,
    }
}

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: authenState,
    reducers: {
        setErrorMsg: (state, action) => {
            const isEmptyErrorMessage = (action.payload ?? []).length === 0;
            state.data.message = isEmptyErrorMessage ? [] : action.payload;
            state.status.isError = isEmptyErrorMessage ? false : true;
        },
        setUserInfo: (state, action) => {
            state.data.userInfo = action.payload; 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticationStatusChecking.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(authenticationStatusChecking.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.status.isAuthen = action.payload.success;
                state.data.message = action.payload.message;
            })
            .addCase(authenticationStatusChecking.rejected, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = true;
                state.status.isAuthen = false;
                state.data.message = action?.error?.message;
            })
    },
    selectors: {
        selectAuthenState: (state) => state.status.isAuthen,
        selectErrorMsg: (state) => state.data.message,
        selectErrorState: (state) => state.status.isError,
        selectLoadingStatus: (state) => state.status.isLoading, 
        selectUserInfo: (state) => state.data.userInfo
    }
})

//Export Reducer to Store 
export default authenticationSlice.reducer;

//Export Actions 
export const {
    setErrorMsg,
    setUserInfo
} = authenticationSlice.actions;

//Export Store State
export const {
    selectErrorMsg,
    selectErrorState,
    selectAuthenState,
    selectLoadingStatus,
    selectUserInfo
} = authenticationSlice.selectors;