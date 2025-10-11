/***************Import external Modules****************** */
import React from 'react';

/***************Import Internal Modules****************** */
import styles from './CartListing.module.css';
import ItemControl from '../itemController/itemControllerContainer';


const CartListing = (props) => {

    //Hook for action 

    //Get the cart information 
    const { cartList, status } = props?.cartController?.data ?? {};
    //const currency = cartInfo.currency ;

    //Get the Keys of products from the store 
    const cartItems = Object.keys(cartList ?? {}) ?? [];

    //Cart Item Content 
    let cartListContent;

    if (cartItems.length > 0) {

        cartListContent = (cartItems ?? []).map((id, index) => {
            const selectedItem = cartList[id].product;
            const { product_name, image_path, unit_price } = selectedItem;

            return (
                <div className={styles.cartItemWrapper} key={index}>
                    <div className={styles.detailWrapper}>
                        <img src={`/assets/images/products/${image_path}`} alt={product_name} />
                        <h1>{product_name}</h1>
                        <span>{`£${unit_price}`}</span>
                    </div>
                    <div className={styles.cartcontrollerWrapper}>
                        <ItemControl data={{selectedItem , cartList, isLoading: status.isLoading }} />
                    </div>
                    
                </div>
            )
        })

    } else {
        cartListContent = 'No Cart Items';
    }

    return (
        <div className={` ${styles.contentWrapper}`}>
            <h1>Shopping Cart</h1>
            <p>Pleasae check the shopping cart before Checking Out </p>
            <div className={styles.cartListWrapper}>
                {cartListContent}
            </div>
        </div>
    )
}

export default CartListing; 