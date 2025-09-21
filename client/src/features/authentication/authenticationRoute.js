/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import FunctionalPageTemplate from '../../components/pageTemplate/functionalPage/FunctionalPageComponent'; 
import signUpRoute from './signUp/signUpRoute'; 


const authenRoute = {
    path: '/authen',
    element: <FunctionalPageTemplate> <Outlet /> </FunctionalPageTemplate>,
    children: [
        signUpRoute
    ]
}

export default authenRoute; 