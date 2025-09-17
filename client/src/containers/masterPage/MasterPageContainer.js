/***************Import External Modules****************** */
import React, { useEffect, createContext } from 'react';
import { useDispatch } from 'react-redux';



/***************Import Internal Modules****************** */
import useWindowObserver from '../app/hook/windowSizeObserver'; 
import useMenuController from './hook/menuController'; 
import useBackgroundController from './hook/backgroundController'; 
import useResponsivecontroller from './hook/responsiveLayoutController'; 
import MasterPageComponent from '../../components/masterPage/MasterPageComponent'; 

/***************Context Content Container****************** */
export const MasterPageContext = createContext(null);


const MasterPageContainer = React.memo(() => {

    //Hook Actions 
    const dispatch = useDispatch(); 


    //Hook for Providing Window Size 
    const windowSize = useWindowObserver(); 

    
    //Hook for Responsive Control 
    useResponsivecontroller(windowSize); 

    
    // Hook for Background Control ( Initial Phase ) 
    useBackgroundController(); 

    //Hook for creating menuController 
    const menuController = useMenuController(windowSize); 

    //Exported Data
    const exportedData = menuController; 


    return (
        <MasterPageContext.Provider value = {exportedData}>
            <MasterPageComponent /> 


        </MasterPageContext.Provider>
    )

})

export default MasterPageContainer; 