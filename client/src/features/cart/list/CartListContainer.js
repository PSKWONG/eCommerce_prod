/***************Import external Modules****************** */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import { selectCartData, isCartLoading } from '../cartSlice';
import CartListComponent from './CartListing';
import cartLoadAndSync from '../middlewares/loadAndSync';


const CartListContainer = () => {

    //Hook Actions 
    const dispatch = useDispatch();

    /********** Get the cart information  *****/
    //Get the cart information at the initiation of the page 
    useEffect(() => {
        dispatch(cartLoadAndSync());
    }, [dispatch])

    //Get the cart list 
    const cartList = useSelector(selectCartData)?.cartList ?? {};

    /********** Get the cart information  *****/
    const isLoading = useSelector(isCartLoading) ?? false;

    //Exported data 
    const exportedData = {
        data: {
            cartList,
            status: {
                isLoading
            }
        }
    }



    return <CartListComponent cartController={exportedData} />;

}

export default CartListContainer; 