/*
Container for processing data for Order Process
Logic: 
# Current Index : 
    * Initiation : Set the initial value as the first checking progress with false; 
    * 
*/

/***************Import external Modules****************** */
import { useState, useEffect, createContext } from 'react';
import { useSelector } from 'react-redux';


/***************Import Internal Modules****************** */
import SubMenuPageTemplate from '../../../containers/pageTemplate/subMenuPage/SubMenuPageContainer';
import SubMenuComponent from './menuList/menuListContainer';
import PageComponent from './orderPortalComponent';
import { selectDataChecking } from '../orderSlice';

/*************** Context for Sharing ****************** */
export const OrderPortalDataSharing = createContext();



const OrderPortalContainer = () => {


    /*************** Set portal progress Data ****************** */
    const progress = useSelector(selectDataChecking);
    const [currentIndex, setCurrentIndex] = useState(0);


    //Set the current Index 
    useEffect(() => {
        const updatedIndex = progress.indexOf(false);
        if(updatedIndex !== currentIndex){
            setCurrentIndex(updatedIndex); 
        }

    }, [progress, currentIndex]);


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