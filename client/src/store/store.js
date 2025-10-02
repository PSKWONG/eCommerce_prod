/***************Import External Modules****************** */
import { configureStore } from '@reduxjs/toolkit';


/***************Import Inernal Modules****************** */
import authenReducer from '../features/authentication/authenticationSlice'; 
import cartReducer from '../features/cart/cartSlice'; 

const store = configureStore({
  reducer: {
    //Import Reducer below 
    authentication : authenReducer,
    cart:cartReducer
  }
});

export default store; 