/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import FunctionalPageTemplate from '../../components/pageTemplate/functionalPage/FunctionalPageComponent'; 
import signUpRoute from './signUp/signUpRoute'; 
import loginRoute from './login/loginRoute'; 


const authenRoute = {
    path: '/authen',
    element: <FunctionalPageTemplate> <Outlet /> </FunctionalPageTemplate>,
    children: [
        signUpRoute,
        loginRoute
    ]
}

export default authenRoute; 