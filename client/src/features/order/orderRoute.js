/***************Import external Modules****************** */

/***************Import Internal Modules****************** */
import OrderPortalComponent from './orderPortal/orderPortalContainer'; 
import cartListingRoute from '../cart/list/cartListingRoute'; 
import profileRoute from './profile/profileRoute'; 



const orderRoute = {
    path: '/order',
    element:
        <OrderPortalComponent />,    
    children: [
        cartListingRoute,
        profileRoute
    ]
}

export default orderRoute; 