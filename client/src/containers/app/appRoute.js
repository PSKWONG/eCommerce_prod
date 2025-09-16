/***************Import External Modules****************** */
import { createBrowserRouter } from 'react-router-dom';


/*************** Router Setting ****************** */
import MasterPage from '../masterPage/MasterPageContainer'; 

/*
This is the outter most layer of App on routing 
*/

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MasterPage />,
    children: [
        //Add the children route here:
    ]

  },
]);

export default appRouter; 