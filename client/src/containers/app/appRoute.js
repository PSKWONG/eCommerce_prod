/***************Import External Modules****************** */
import { createBrowserRouter } from 'react-router-dom';


/*************** Router Setting ****************** */
import MasterPage from '../masterPage/MasterPageContainer';
import authenticationRoute from '../../features/authentication/authenticationRoute';
import productRoute from '../shop/shopRoute'; 
import userRoute from '../users/usersPortalRoute'; 
import orderRoute from '../../features/order/orderRoute'; 

/*
This is the outter most layer of App on routing 
*/

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MasterPage />,
    children: [
      //Add the children route here:
      authenticationRoute, 
      productRoute,
      userRoute,
      orderRoute
    ]

  },
]);

export default appRouter; 