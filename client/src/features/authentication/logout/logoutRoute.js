/*
Route on handling Logout process 
*/

/***************Import External Modules****************** */
import { redirect } from 'react-router-dom';


/***************Import Internal Modules****************** */
import api from '../../../api/apiConnector';
import LogoutComponent from './logoutContainer'; 



const logOutRoute = {

    path: "logout",
    element: <LogoutComponent />,
    loader: async () => {

        //Feedback Object 
        let feedback = {
            path: null,
            success: null
        }

        //Fetch User Information 
        try {

            //Fetch the user Information from the API 
            const response = await api.post('/authen/logout');

            const { success, data } = response;

            feedback.path = data.path ?? '/'; 
            feedback.success = success; 

            return feedback;             

        } catch (err) {

            //Log Error
            console.log(
                `
                Error in Local User / Logout 
                #Error: ${err}
                `
            );

            feedback.path =  '/'; 
            feedback.success = false; 

            return feedback; 

        }
    }

}

export default logOutRoute; 