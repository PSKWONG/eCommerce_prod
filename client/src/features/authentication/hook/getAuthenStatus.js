/*
Hook for containers 
- To get Authentication Status 
*/

/***************Import External Modules****************** */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import authenticationStatusChecking from '../helperFunctions/authenticationChecking';



const useAuthenticationChecking = () => {

     //Hook Actions 
        const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authenticationStatusChecking());
    }, [dispatch])

}

export default useAuthenticationChecking; 