/***************Import Internal Modules****************** */
import { useEffect } from 'react';
import { useActionData, useNavigation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import SignUpComponent from './signUpComponent';
import { setErrorMsg, setErrorStates } from '../authenticationSlice';

const SignUpContainer = () => {

    //Hook for actions
    const navigate = useNavigate();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    

    /*************** Handle Data from Router ****************** */
    /*
    Retrieve the data and message from Action Data of Router
    * Before form submission 
        - Pass "isError" : false 
        - Message: [] 
    * After form submission
        - Pass the message ( error ) to redux Store ( if applicable )
        - Pass the status "isError" to redux store ( if applicable )
    */

    const { success, message } = useActionData() ?? {};

    //Effect Hook on setting Error Message to Redux Store 
    useEffect(() => {
        dispatch(setErrorMsg(message));
    }, [message, dispatch])

    //Reset Error states / Message of Redux Store 
    const handleResetErrorMsg = (event) => {
        event.preventDefault();
        dispatch(setErrorMsg([]));
    }


    /*************** Page Navigation Control ****************** */


    //Effect Hook on Success Sign Up ( Phase : Directing Page )
    useEffect(() => {
        if (success) {
            navigate('/');
        }

    }, [success, navigate])


    /*************** Button Actions ****************** */
    //Login Button
    const handleLogin = (event) => {
        event.preventDefault();
        navigate('/authen/login');
        return;
    }


    /*************** Form Control Object ****************** */
    const exportedData = {
        data: {
            status: {
                isSubmitting: navigation.state === 'submitting',
            }
        },
        actions: {
            handleLogin,
            handleResetErrorMsg
        }
    }


    return <SignUpComponent control={exportedData} />
}

export default SignUpContainer; 
