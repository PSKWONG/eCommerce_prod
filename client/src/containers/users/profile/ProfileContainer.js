/*
Container for Profile Container 
*/

/***************Import external Modules****************** */
import React, { useState, useEffect } from 'react';
import { useActionData, useNavigation, useLoaderData } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import ProfileComponent from '../../../components/users/profile/ProfileComponent';
import { setUserInfo, setErrorMsg } from '../../../features/authentication/authenticationSlice';
import { selectLoadingStatus, selectErrorMsg, selectErrorState } from '../../../features/authentication/authenticationSlice';





const ProfileContainer = () => {

    //Hook actions
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /***************Retrieve Authentication Status && Info ****************** */
    const userInfo = useLoaderData().data;

    /***************Retrieve Updated Info ****************** */
    const updatedUserInfo = useActionData()?.data ?? null;
    const isUpdateSuccess = useActionData()?.success ?? true;
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {

        console.log(`Profile Container / isUpdateSuccess : ${isUpdateSuccess}`);

        if (isUpdateSuccess && updatedUserInfo) {

            setIsEditable(false);

        } else if(!isUpdateSuccess){

            setIsEditable(true);
            
        }

        return () => setIsEditable(false);

    }, [isUpdateSuccess, updatedUserInfo])

    //Action for Controlling Editability
    const handleEditability = (event) => {
        event.preventDefault();
        setIsEditable(isEditable ? false : true);

        return () => dispatch(setErrorMsg([]));
    }

    /*************** Update User Info of Redux Store ****************** */
    useEffect(() => {
        dispatch(setUserInfo(updatedUserInfo || userInfo));
    }, [userInfo, updatedUserInfo, dispatch])

    /*************** Handle Errors ****************** */
    const errorActionMsg = useActionData()?.error ?? null;
    const errorLoaderMsg = useLoaderData()?.error ?? null;
    const errorMsg = (errorActionMsg || errorLoaderMsg) ?? null;

    //Update on Error Message 
    useEffect(() => {

        if (errorMsg) {
            dispatch(setErrorMsg(errorMsg));
        }

        return () => dispatch(setErrorMsg([]));

    }, [errorMsg, dispatch])

    //Get Error Status and Message 
    const errMessage = useSelector(selectErrorMsg);
    const errStatus = useSelector(selectErrorState);


    /*************** Loading Status ****************** */
    const isAuthenLoading = (useSelector(selectLoadingStatus) || navigation.state === 'loading') ?? true;
    const isSubmitting = navigation.state === 'submitting';
    const isLoaderResolving = navigation.state === 'loading';


    /*************** Exported Data ****************** */
    const exportedData = {
        data: {
            userInfo,
            status: {
                isEditable,
                isSubmitting: isSubmitting || isLoaderResolving
            },
            error: {
                errMessage,
                errStatus
            }
        },
        actions: {
            handleEditability
        }
    }



    return (
        <>
            {
                (isAuthenLoading || isLoaderResolving) && <>Loading </>
            }
            {
                !(isAuthenLoading || isLoaderResolving) && <ProfileComponent control={exportedData} />
            }

        </>
    )
}

export default ProfileContainer; 