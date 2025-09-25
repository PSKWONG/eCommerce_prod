/***************Import External Modules****************** */
import React, { createContext } from 'react';



/***************Import Internal Modules****************** */
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

    //Get Authentication State for the site
    useAuthenticationChecking(); 

     // Hook for Background Control ( Initial Phase ) 
    useBackgroundController();

    //Hook for Responsive Control 
    //useResponsivecontroller(windowSize);
    const layout = useResponsivecontroller().data.layout;

    //Hook for creating menuController 
    const menuController = useMenuController(layout);

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