/*
*/

/***************Import external Modules****************** */
import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


/***************Import Internal Modules****************** */
import { selectAuthenState } from '../../authentication/authenticationSlice';
import { OrderPortalDataSharing } from '../orderPortal/orderPortalContainer';
import { updateOrderData, setError } from '../orderSlice';
import useDataChecker from '../hook/dataChecker';
import ProfileComponent from './profileComponent';


/*************** Profile Data ****************** */
//The default Data Structure 
const defaultProfileData = {
    userName: '',
    email: '',
}

const ProfileContainer = () => {

    //Hook for actions
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /*************** Data Checker  ****************** */
    const currentIndex = useContext(OrderPortalDataSharing).portalProgressData?.data?.currentIndex ?? 0;
    const dataChecker = useDataChecker(currentIndex);

    /*************** Profile Infromation  ****************** */
    //Store for the Form Data ( Exported Data )
    const [profileData, setProfileData] = useState(defaultProfileData);
    //Check whether the user is a registered user 
    const isAuthen = useSelector(selectAuthenState);


    //Update the information for authentication status
    useEffect(() => {

        //If user is authenticated 
        if (isAuthen) {

            //Initiate the upload process
            dataChecker()

            //Checking 
            console.log(`Authenticated User `);

            return;

        }

    }, [isAuthen, profileData, currentIndex,  dataChecker, dispatch, navigate]);

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

        //Update the readiness of the section
        dispatch(setError([]));
    }

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

};

export default ProfileContainer; 