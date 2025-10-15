

/***************Import External Modules****************** */
import { redirect } from 'react-router-dom';


/***************Import Internal Modules****************** */
import ProfileContainer from './ProfileContainer';
import api from '../../../api/apiConnector';



const profileRoute = {
    index: true,
    element: <ProfileContainer />,
    loader: async () => {

        //Construct of feedback 
        let feedback = {
            data: null,
            error: []
        }

        try {

            //Get Data from API Server ( User )
            const response = await api.get('/users/profile');

            //Get the user data 
            const { success, status, data } = response;

            //Conditional Feedback from Loader
            switch (true) {

                case (success === true):
                    feedback.data = data.info[`users`];
                    return feedback;

                case (success === false && status !== 401):
                    feedback.error.push('Fail on retrieving user profile. Please try again.')
                    return feedback;

                case (success === false && status === 401):
                    return redirect(data.path ?? '/');

                default:
                    return redirect(data.path ?? '/');
            }

        } catch (err) {

            //Internal Log
            console.log(`
                Error in retrieving user profile 
                #Error : ${err}
                `);

            return redirect('/');

        }


    },
    action: async ({ request }) => {

        //Data Return
        let feedback = {
            success: null,
            path: null,
            data: null,
            error: []
        };

        //Get Data from Form in component 
        const formData = await request.formData();

        //Input Data 
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const passwordCheck = formData.get('passwordCheck');

        //Request object Construction 
        let requestObj = {};

        //Helper function on checking
        const isEmpty = (input) => {
            if (input.trim() === "") {
                return true;
            } else {
                return false;
            }
        }

        // Information Checking and variable assignment 
        if (!isEmpty(username)) {
            requestObj.userName = username;
        }

        if (!isEmpty(email)) {
            requestObj.email = email;
        }

        if (!isEmpty(password) || !isEmpty(passwordCheck)) {
            if (password === passwordCheck) {
                requestObj.password = password;
            } else {
                feedback.error.push('Passwords must match');
            }
        }

        //Input Checking 
        if (feedback.error.length > 0) {
            feedback.success = false;
            feedback.success = false;
            return feedback;
        }

        //API Call to server 
        try {

            //If the request is sucessfull, extract the response from the AXIOS object
            const response = await api.put('/users/local/update', requestObj);

            //Extract Information 
            const { success, status, data } = response;

            //Conditional Response 
            switch (true) {

                case (success === true):
                    feedback.success = true;
                    feedback.data = data.info[`users`];
                    return feedback;

                case (success === false && data?.message?.length > 0):

                    feedback.success = false;
                    (data?.message ?? []).forEach((message) => {
                        feedback.error.push(message);
                    });
                    return feedback;

                case (status === 401):
                    return redirect('/');

                default:
                    return redirect('/user');

            }

        } catch (err) {

            //Internal Log 
            console.log(`
                Error in submitting user profile update
                #Error : ${err}
                `);
            feedback.success = false;
            feedback.success = false;
            feedback.error.push('Fail on updating user profile. Please try again.')

            return feedback;

        }

    }


}

export default profileRoute; 
