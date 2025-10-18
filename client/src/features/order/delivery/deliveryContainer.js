/*
*/

/***************Import external Modules****************** */
import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';


/***************Import Internal Modules****************** */
import { OrderPortalDataSharing } from '../orderPortal/orderPortalContainer';
import { updateOrderData } from '../orderSlice';
import DeliveryComponent from './deliveryComponent';


/*************** Delivery Data ****************** */
//The default Data Structure 
const defaultDeliveryData = {
    deliveryDate: ''

}

const DeliveryContainer = React.memo(() => {

    //Hook for actions
    const dispatch = useDispatch();


    /*************** Data Checker  ****************** */
    const { section } = useContext(OrderPortalDataSharing).portalProgressData?.data ?? {};

    /*************** Delivery Infromation  ****************** */
    //Store for the Form Data ( Exported Data )
    const [deliveryData, setDeliveryData] = useState(defaultDeliveryData);



    /*************** Actions for form ****************** */
    //Handle input value for action of onChange
    const handleOnChange = (event) => {

        event.preventDefault();

        //Get the information of the input 
        const { name, value } = event.target;

        //Update the value 
        setDeliveryData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ));

    }

    //Handle Sync of data change between store and form 
    useEffect(() => {
        //Update the readiness of the section
        dispatch(updateOrderData({ section, sectionData: deliveryData }))
    }, [deliveryData, section, dispatch])


    /*************** Export Information ****************** */
    const data = {
        deliveryData,
    }

    const action = {
        handleOnChange,
    }

    return <DeliveryComponent data={data} action={action} />

});

export default DeliveryContainer; 