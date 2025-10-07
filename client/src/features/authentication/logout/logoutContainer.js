/*
Container for Logout  Container 
*/


/***************Import external Modules****************** */
import React, {  useEffect } from 'react';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import authenChecking from '../helperFunctions/authenticationChecking';

const LogoutContainer = () => {

    //Hook actions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /***************Retrieve Status && Info ****************** */
    const feedback = useLoaderData();
    const { path, success } = feedback;

    /***************Handle Authentication Status ****************** */
    useEffect(() => {

        if (success) {
            dispatch(authenChecking());
            navigate(path);
            return; 
        } else {
            navigate(path);
            return; 
        }

    }, [success, path, navigate, dispatch]);


    return <></>

};

export default LogoutContainer; 