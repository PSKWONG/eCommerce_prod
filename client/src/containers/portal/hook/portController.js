/***************Import external Modules****************** */
import { useState } from 'react';


const usePortalController = () => {

    /* 
        States for the Controller 
        - isVisibile to constrol whether displaying the portal; 
    */
    const [isVisible, setIsVisible] = useState(false);


    //Actions to show the portal 
    const showPortal = (event)=>{
        event.preventDefault(); 
        setIsVisible(true); 
    }



    return {
        data: {
            isVisible
        }, 
        actions:{
            showPortal
        }
    }


}

export default usePortalController