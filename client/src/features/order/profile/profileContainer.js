/*
*/

/***************Import external Modules****************** */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


/***************Import Internal Modules****************** */
import { selectUserInfo } from '../../authentication/authenSlice';
import { setDeliveryChecking, updateDeliveryInfo, updateUserInfo, setErrorMessage } from '../orderSlice';
import { selectOrderErrorMessage, isOrderLoading, isOrderError } from '../orderSlice';
import DeliveryComponent from './Delivery';


/*************** Profile Data ****************** */
//The default Data Structure 
const defaultProfileData = {
    userName: '',
    email: '',
    isAuthen: false
}

const ProfileContainer = () => {

}; 

export default ProfileContainer; 