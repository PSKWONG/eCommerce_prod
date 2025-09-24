/*
Sign Up Route 
- Get the Form information 
- Fetch Server API and get the data 
- Pass the data to Sign Up Container 
*/


/***************Import Internal Modules****************** */
import SignUpComponent from '../signUp/signUpContainer';
import api from '../../../api/apiConnector';


const signUpRoute = {
    path: "signup",
    element: <SignUpComponent />,
    loader:async()=>{
        //Phase 2 - Get Error Message from Authentication failure 
    },
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
        const userName = "Customer"
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordCheck = formData.get('passwordCheck');

        //###### Edge Case - Password is not matched ######
        if (password !== passwordCheck) {
            feedback.message.push('Passwords is not matched')
            return feedback;
        }

        //User Input Data 
        const userData = { userName, email, password };

        //API Request Calling 
        try {

            // Fetch the reponse 
            const response = await api.post('/users/local/create', userData);
            const { message, ...data } = response.data;

            feedback.success = response.success;
            feedback.data = data;
            feedback.message = [...feedback.message, ...message]; 

            return feedback;


        } catch (err) {

            //Log Error
            console.log(`
                Error in Creating User 
                #Input: ${userData}
                #Error: ${err}
                `)
            feedback.success = false;
            feedback.message.push('Internal Error. Please try again later.');
            return feedback;
        }


    }

}

export default signUpRoute; 