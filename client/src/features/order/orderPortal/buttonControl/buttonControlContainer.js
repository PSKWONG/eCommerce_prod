/*
Container for processing data for buttons for Order Process
Logic: 
# Forward Action: 
    Be Avaliable, after: 
    1) Checking the position of selected page 
    2) Completeness of the current page  ( Calling the checking function )
    3) Determine the target page ( stay or forward )
#Backward Action : 
    Be Avaliable before comformation
# Cancel Action: 
    Be avaliable before confirmation 
# Extra Action: ( ??? )
    Avaliable for hook 
*/

/***************Import external Modules****************** */
import { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from 'react-router';

/***************Import Internal Modules****************** */
import api from '../../../../api/apiConnector';
import process from '../../data/menuItems.json';
import PageComponent from './buttonControlComponent';
import { OrderPortalDataSharing } from '../orderPortalContainer';
import { setError, resetOrder } from '../../orderSlice';
import { selectOrderData } from '../../orderSlice';
//import dataChecker from '../../middlewares/dataChecker';



const ButtonControlContainer = () => {

    //Hook Actions
    const navigate = useNavigation();
    const dispatch = useDispatch();

    /*************** Get selected Index ****************** */
    const { data } = useContext(OrderPortalDataSharing).portalProgressData ?? {};
    const currentIndex = data?.currentIndex ?? 0;

    /*************** Get Order Store data ****************** */
    const orderStoreData = useSelector(selectOrderData) ?? {};
    const section = process[currentIndex].ref ?? null;
    const sectionData = orderStoreData.section ?? null;

    /***************Button Actions****************** */
    const handleCancellation = (event) => {
        event.preventDefault();
        dispatch(resetOrder()); 
        navigate('/order');
        return; 
    };

    const handleForward = async (event) => {

        event.preventDefault();

        //Posting data to API Server 
        try {

            const response = await api.post('/order/dataChecking', { section, sectionData });
            const { success, data } = response;

            if (success) {
                navigate('/');
                return
            } else {

                //Internal Log 
                console.log(`
                    Error in Order / Data Checking 
                    Input : 
                        * Secion :  ${JSON.stringify(section, null, 2)}  
                        * Section Data : ${JSON.stringify(sectionData, null, 2)}   
                    Error Message: 
                        * ${JSON.stringify((data?.message ?? ''), null, 2)}
                `);

                dispatch(setError(data?.message ?? []));
                return; 

            }


        } catch (err) {
            //Internal Log 
            console.log(`
                    Error in Order / Data Checking 
                    Input : 
                        * Secion : ${JSON.stringify(section, null, 2)}   
                        * Section Data : ${JSON.stringify(sectionData, null, 2)}   
                    Error : ${JSON.stringify(err, null, 2)}
            `);

            dispatch(setError(['Internal Error. Please try again later.']));

            return; 

        }


    };

    const handleBackward = (event) => {
        event.preventDefault();
    };


    /***************Export data****************** */
    const exportedData = {
        data: {
            forward: process[currentIndex]?.instructions[1] ?? null,
            backward: process[currentIndex]?.instructions[0] ?? null,
            status: {

            }
        },
        actions: {
            handleCancellation,
            handleForward,
            handleBackward
        }

    }

    return <PageComponent controller={exportedData} />

};

export default ButtonControlContainer; 