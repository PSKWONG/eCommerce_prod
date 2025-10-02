/*
Hook for exporting required controller for cartController
# Information Needed: 
    - Cart List 
    - Selected Item
    - Quantity instance from quantity Controller

# Logic on setting intial Quantity 
- Condition 1 (If selected item is not exist in the cart list)
    * Set the initial Quantity as 0 
- Condition 2 (If selected item is existed in the cart list)
    * Set the initial Quantity as the cart

# I

#
*/



/***************Import external Modules****************** */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import useQuantityController from '../hook/quantityControl/useQuantityController';
import ItemControllerComponent from './itemControllerComponent';
import itemUpdater from '../middlewares/itemUpdate';
import styles from './itemController.module.css';


const ItemControlContainer = (props) => {


    /******************* Set Hook for actions ********************* */
    const dispatch = useDispatch();

    /******************* Data Extraction ********************* */
    const { selectedItem, cartList, isLoading } = props.data;


    //const isLoading = false; 

    //Checking
    console.log(`ItemController Imported Data
            selectedItem : ${JSON.stringify(selectedItem, null, 2)}
            cartList: ${JSON.stringify(cartList, null, 2)}
            `)

    /******************* Check for Data Input  ********************* */
    useEffect(() => {

        if (!selectedItem || !cartList) {
            console.log(`blank`);
            return <></>
        }
    }, [selectedItem, cartList])


    /******************* Gather information for controller logic********************* */
    //Cart List Information 
    const currentCartList = cartList ?? null;
    //Selected Item 
    const cartItem = currentCartList[selectedItem.id]
    //Quantity Controller 
    const QTYController = useQuantityController();
    const { quantity } = QTYController.data;
    const { setQuantity } = QTYController.actions;


    /******************* Set the intial Quantity ********************* */
    useEffect(() => {

        const setInitiateQTY = () => {

            if (cartItem) {
                console.log(`Get the initial value of selected item: ${JSON.stringify(cartItem.quantity, null, 2)}`)
                setQuantity(cartItem.quantity);
            } else {
                setQuantity(0); // Reset for new item
            }

        }

        setInitiateQTY();

        return () => setQuantity(0);


    }, [cartItem, setQuantity, currentCartList])


    /******************* Button Actions ********************* */
    //Check if the changes are made 
    const isUpdate = (cartItem?.quantity ?? 0) !== quantity;
    const [updateAction, setUpdateAction] = useState(false);

    //Update Cart Actions 
    useEffect(() => {

        //Get the update cart 
        const updatedCartItem = {
            product: selectedItem,
            quantity: quantity
        }


        //Action to be taken on update the cart 
        const updateCart = () => {

            if (updateAction) {

                console.log('Item controller / updatedCartItem', updatedCartItem)

                //Dispatch for Item Update 
                dispatch(itemUpdater(updatedCartItem))
            }

            return;

        }

        updateCart();

        return () => {
            setUpdateAction(false);
        }

    }, [updateAction, selectedItem, quantity, dispatch])



    //Handler ( Action ) for submit Button 
    const handleSubmit = (event) => {

        event.preventDefault();

        if (isUpdate) {
            setUpdateAction(true);
        }

    }

    //Handler ( Action ) for delete Button 
    const handleDelete = (event) => {

        event.preventDefault();
        setQuantity(0);

        if (cartItem) {
            setUpdateAction(true);
        }

    }

    /******************* Submit Button Controller ********************* */
    const buttonController = {
        data: {
            submitWording: cartItem ? "Update" : "Add",
            deleteWording: "Delete"
        },
        action: {
            handleSubmit,
            handleDelete
        }

    }

    /******************* Exporting information ********************* */
    const itemController = {

        data: {
            QTYController,
            buttonController
        },
        status: {
            isLoading: isLoading ?? false
        },
        controllerStyle: {
            wrapperStyle: isLoading ?? false ? `${styles.itemControlWrapper} ${styles.greyOut} ` : `${styles.itemControlWrapper}  `,
        }
    }


    return <ItemControllerComponent itemController={itemController} />

}

export default ItemControlContainer;

/*
            iconStyle: isUpdate && !(isLoading ?? false) ? `${styles.icon} ${styles.iconDisable} ` : `${styles.icon} `

            */