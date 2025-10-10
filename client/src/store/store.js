/***************Import External Modules****************** */
import { configureStore } from '@reduxjs/toolkit';


/***************Import Inernal Modules****************** */
import authenReducer from '../features/authentication/authenticationSlice'; 
import cartReducer from '../features/cart/cartSlice'; 
import orderReducer from '../features/order/orderSlice'; 

const store = configureStore({
  reducer: {
    //Import Reducer below 
    authentication : authenReducer,
    cart:cartReducer,
    order:orderReducer
  }
});

export default store; 