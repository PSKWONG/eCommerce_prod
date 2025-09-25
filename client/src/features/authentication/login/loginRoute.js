/*
Login Route 
- Get the Form information 
- Fetch Server API and get the data 
- Pass the data to Login Container 
*/


/***************Import Internal Modules****************** */
import LoginComponent from '../login/LoginContainer'; 
import api from '../../../api/apiConnector';


const loginRoute = {
    path: "login",
    element: <LoginComponent />,
    action: async ({ request }) => {

        //Feedback for Sign Up Component 
        const feedback = {
            success: false,
            data: null,
            message: []
        };

        //Get Data from Form in component 
        const formData = await request.formData();

        //Input Data 
        const email = formData.get('email');
        const password = formData.get('password');


        //User Input Data 
        const userData = { email, password };

        //API Request Calling 
        try {

            // Fetch the reponse 
            const response = await api.post('/authen/login/local', userData);
            const { message, ...data } = response.data;

            feedback.success = response.success;
            feedback.data = data;
            feedback.message = [...feedback.message, ...message]; 

            return feedback;


        } catch (err) {

            //Log Error
            console.log(`
                Error in Local User Login
                #Input: ${userData}
                #Error: ${err}
                `)
            feedback.success = false;
            feedback.message.push('Internal Error. Please try again later.');
            return feedback;
        }


    }

}

export default loginRoute; 