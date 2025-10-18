/*
*/

/***************Import external Modules****************** */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


/***************Import Internal Modules****************** */
import { selectAuthenState } from '../../authentication/authenticationSlice';
import { OrderPortalDataSharing } from '../orderPortal/orderPortalContainer';
import { updateOrderData } from '../orderSlice';
import useProgressGuide from '../hook/progressGuide';
import ProfileComponent from './profileComponent';


/*************** Profile Data ****************** */
//The default Data Structure 
const defaultProfileData = {
    userName: '',
    email: '',
}

const ProfileContainer = React.memo(() => {

    //Hook for actions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Import Progress Guide Action 
    const { handleForward } = useProgressGuide();

    /*************** Data Checker  ****************** */
    const { section } = useContext(OrderPortalDataSharing).portalProgressData?.data ?? {};

    /*************** Profile Infromation  ****************** */
    //Store for the Form Data ( Exported Data )
    const [profileData, setProfileData] = useState(defaultProfileData);
    //Check whether the user is a registered user 
    const isAuthen = useSelector(selectAuthenState);


    //Handle the authentication skipping 
    useEffect(() => {

        const handleAuthenUser = async () => {
            if (isAuthen) {
                handleForward();
            }
        }
        handleAuthenUser();

    }, [])







    /*************** Actions for form ****************** */
    //Handle input value for action of onChange
    const handleOnChange = (event) => {

        event.preventDefault();

        //Get the information of the input 
        const { name, value } = event.target;

        //Update the value 
        setProfileData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ));

    }

    //Handle Sync of data change between store and form 
    useEffect(() => {
        //Update the readiness of the section
        dispatch(updateOrderData({ section, sectionData: profileData }))
    }, [profileData, section, dispatch])


    //Handle Login / Sign up redirecting 
    const handleLogin = (event) => {

        event.preventDefault();

        navigate('/authen/signup');
    }

    /*************** Export Information ****************** */
    const data = {
        profileData,
    }

    const action = {
        handleOnChange,
        handleLogin
    }

    return <ProfileComponent data={data} action={action} />

});

export default ProfileContainer; 