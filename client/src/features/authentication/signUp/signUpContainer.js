/***************Import Internal Modules****************** */
import { useEffect } from 'react';
import { useActionData, useNavigation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/***************Import Internal Modules****************** */
import SignUpComponent from './signUpComponent';
import authenChecking from '../helperFunctions/authenticationChecking';
import { setErrorMsg } from '../authenticationSlice';
import { selectAuthenState, selectLoadingStatus } from '../authenticationSlice';

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
    const authenStatus = useSelector(selectAuthenState);
    const isLoading = useSelector(selectLoadingStatus);

    //Effect Hook on controlling page navigation
    useEffect(() => {
        if (success) {
            //Authentication status will update
            dispatch(authenChecking());
            //Redirect to the Home Page ( Phase 2 , Previously Page )
            navigate('/');
        } 

    }, [success, navigate, dispatch])

    //Authenticated user will redirect to the home page 
    if (authenStatus && !isLoading) {
        navigate('/');
        return;
    }

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


    return (
        <>
            {
                !isLoading &&
                <SignUpComponent control={exportedData} />

            }
        </>
    )




}

export default SignUpContainer; 
