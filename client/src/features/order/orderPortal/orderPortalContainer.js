/*
Container for processing data for Order Process
Logic: 
# Current Index : 
    * Initiation : Set the initial value as the first checking progress with false; 
    * 
*/

/***************Import external Modules****************** */
import { useState, useEffect, createContext, useMemo } from 'react';
import { useSelector } from 'react-redux';


/***************Import Internal Modules****************** */
import SubMenuPageTemplate from '../../../containers/pageTemplate/subMenuPage/SubMenuPageContainer';
import SubMenuComponent from './menuList/menuListContainer';
import PageComponent from './orderPortalComponent';
import useProgressGuide from '../hook/progressGuide';

/*************** Context for Sharing ****************** */
export const OrderPortalDataSharing = createContext();



const OrderPortalContainer = () => {


    /*************** Set portal progress Data ****************** */
    const currentIndex = useProgressGuide() ?? 0;
    

    console.log(`Order Portal Logging`);


    /***************Export Data****************** */
    const portalProgressData = {
        data: {
            currentIndex
        },
        status: {

        }
    }



    return (
        <OrderPortalDataSharing.Provider value={{ portalProgressData }}>
            <SubMenuPageTemplate subMenu={SubMenuComponent} >
                <PageComponent />
            </SubMenuPageTemplate>
        </OrderPortalDataSharing.Provider>
    )

};

export default OrderPortalContainer; 