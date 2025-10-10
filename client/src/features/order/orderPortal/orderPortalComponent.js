/*
Component for arranging data for Order Process
*/

/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import ButtonComponents from './buttonControl/buttonControlContainer';
import './orderPortal.css';

const OrderPortalComponent = () => {

    return (

        <div className='orderPortalWrapper'>
            <Outlet />
            <ButtonComponents />
        </div>

    )

};

export default OrderPortalComponent; 