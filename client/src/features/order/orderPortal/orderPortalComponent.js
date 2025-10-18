/*
Component for arranging data for Order Process
*/

/***************Import external Modules****************** */
//import { Outlet } from 'react-router-dom';
import { useContext } from 'react';

/***************Import Internal Modules****************** */
import ButtonComponents from './buttonControl/buttonControlContainer';
import ErrorComponents from './errorHandling/errorHandlingContainer';
import pageRegistration from './progressGuide/progressRegistration';
import { OrderPortalDataSharing } from './orderPortalContainer';
import './orderPortal.css';

const OrderPortalComponent = () => {
    const { displayElement } = useContext(OrderPortalDataSharing);

    return (

        <div className='orderPortalWrapper'>
            {displayElement}
            <ErrorComponents />
            <ButtonComponents />
        </div>

    )

};

export default OrderPortalComponent; 