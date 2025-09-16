/***************Import External Modules****************** */
import React from 'react';
import { RouterProvider } from 'react-router-dom';
//import router from '../page/routes';


/***************Import Internal Modules****************** */
import appRoute from './appRoute'; 


const AppContainer = () => {

    return <RouterProvider router={appRoute} />;

}

export default AppContainer; 