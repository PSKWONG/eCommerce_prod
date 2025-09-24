/*
Hook for containers 
- To get Authentication Status 
*/

/***************Import External Modules****************** */
import {useDispatch} from 'react-redux'; 

/***************Import Internal Modules****************** */
import authenticationStatusChecking from '../helperFunctions/authenticationChecking'; 



const useAuthenticationChecking = ()=>{

    //Hook Actions 
    const dispatch = useDispatch(); 
    dispatch(authenticationStatusChecking()); 

}

export default useAuthenticationChecking; 