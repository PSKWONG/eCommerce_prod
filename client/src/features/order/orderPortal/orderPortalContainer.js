/*
Container for processing data for Order Process
Logic: 
# Current Index : 
    * Initiation : Set the initial value as the first checking progress with false; 
    * 
*/

/***************Import external Modules****************** */
import React, { useState, useMemo, createContext } from 'react';
import { useSelector } from 'react-redux';


/***************Import Internal Modules****************** */
import SubMenuPageTemplate from '../../../containers/pageTemplate/subMenuPage/SubMenuPageContainer';
import SubMenuComponent from './menuList/menuListContainer';
import PageComponent from './orderPortalComponent';
import progressGuide from '../data/menuItems.json';
import usePageSelector from './progressGuide/pageSelector';



import { isOrderLoading, selectErrorMsg } from '../orderSlice';


/*************** Context for Sharing ****************** */
export const OrderPortalDataSharing = createContext();



const OrderPortalContainer = () => {


    /*************** Set portal progress Data ****************** */
    const [currentIndex, setCurrentIndex] = useState(0);
    const section = useMemo(() => progressGuide[currentIndex].ref, [currentIndex])

    /*************** Set Display Element  ****************** */
    const displayElement = usePageSelector(currentIndex, progressGuide);


    /***************Export Data****************** */
    const portalProgressData = {
        data: {
            currentIndex,
            progressGuide,
            section
        },
        actions: {
            setCurrentIndex
        }
    }



    return (
        <OrderPortalDataSharing.Provider value={{ portalProgressData, displayElement }}>
            <SubMenuPageTemplate subMenu={SubMenuComponent} >
                <PageComponent />
            </SubMenuPageTemplate>
        </OrderPortalDataSharing.Provider>
    )

};

export default OrderPortalContainer; 