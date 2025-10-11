/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import OrderPortalComponent from './orderPortal/orderPortalContainer'; 
import cartListingRoute from '../cart/list/cartListingRoute'; 



const orderRoute = {
    path: '/order',
    element:
        <OrderPortalComponent />,    
    children: [
        cartListingRoute
    ]
}

export default orderRoute; 