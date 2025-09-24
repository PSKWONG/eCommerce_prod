/***************Import External Modules****************** */
import React, { createContext } from 'react';



/***************Import Internal Modules****************** */
import useWindowObserver from '../app/hook/windowSizeObserver';
import useMenuController from './hook/menuController';
import useBackgroundController from './hook/backgroundController';
import useResponsivecontroller from './hook/responsiveLayoutController';
import usePortalController from '../../containers/portal/hook/portController';
import useAuthenticationChecking from '../../features/authentication/hook/getAuthenStatus'; 
import PortalMenu from '../../components/masterPage/portalMenu/PortalMenu';
import MasterPageComponent from '../../components/masterPage/MasterPageComponent';

/***************Context Content Container****************** */
export const MasterPageContext = createContext(null);


const MasterPageContainer = React.memo(() => {

    //Hook for Providing Window Size 
    const windowSize = useWindowObserver();


    //Hook for Responsive Control 
    useResponsivecontroller(windowSize);

    //Get Authentication State for the site
    useAuthenticationChecking(); 

    // Hook for Background Control ( Initial Phase ) 
    useBackgroundController();

    //Hook for creating menuController 
    const menuController = useMenuController(windowSize);



    //Hook for Portal Control
    const portalController = usePortalController(PortalMenu);
    const { PortalComponent } = portalController.data;

    //Exported Data
    const exportedData = {
        data: {
            ...menuController.data
        },
        actions: {
            ...menuController.actions,
            ...portalController.actions
        }
    };

    return (
        <MasterPageContext.Provider value={exportedData}>
            <MasterPageComponent />
            <PortalComponent />
        </MasterPageContext.Provider>
    )

})

export default MasterPageContainer; 