/***************Import External Modules****************** */
import { configureStore } from '@reduxjs/toolkit';


/***************Import Inernal Modules****************** */
import authenReducer from '../features/authentication/authenticationSlice'; 

const store = configureStore({
  reducer: {
    //Import Reducer below 
    authentication : authenReducer
  }
});

export default store; 