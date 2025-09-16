/***************Import External Modules****************** */
import React, { useEffect, createContext } from 'react';
import { useDispatch } from 'react-redux';



/***************Import Internal Modules****************** */
import useWindowObserver from '../app/hook/windowSizeObserver'; 
import useMenuController from './hook/menuController'; 

/***************Context Content Container****************** */
export const MasterPageContext = createContext(null);


const MasterPageContainer = React.memo(() => {

    //Hook Actions 
    const dispatch = useDispatch(); 

    /*
    Menu Control
    - Use Windows Observer to obtain the Windows Size 
    - Put the widnows size information to the Menu Controller function
    - Get MenuController Information 
    */
    const windowSize = useWindowObserver(); 
    const menuController = useMenuController(windowSize); 

    //Exported Data
    const exportedData = menuController; 


    return (
        <MasterPageContext.Provider value = {exportedData}>
            


        </MasterPageContext.Provider>
    )

})

export default MasterPageContainer; 