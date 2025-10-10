/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import OrderPortalComponent from './orderPortal/orderPortalContainer'; 
import portalRoute from './orderPortal/orderPortalRoute'; 



const orderRoute = {
    path: '/order',
    element:
        <OrderPortalComponent />,    
    children: [
        portalRoute
    ]
}

export default orderRoute; 