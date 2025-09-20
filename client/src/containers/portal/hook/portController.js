/***************Import external Modules****************** */
import { useState, useEffect, isValidElement  } from 'react';

/***************Import Internal Modules****************** */
import PortalTemplate from '../../../components/portal/portComponent'; 


const usePortalController = (content) => {

    /* 
        States for the Controller 
        - isVisibile to constrol whether displaying the portal; 
    */
    const [isVisible, setIsVisible] = useState(false);
    const [visibleContent, setVisibleContent] = useState(); 

    //Update visible content
    useEffect(()=>{
        if(isValidElement(content)){
            setVisibleContent(content); 
        }
        setVisibleContent(<>There is no content to display</>)
    }, [content])


    //Actions to show the portal 
    const showPortal = (event)=>{
        event.preventDefault(); 
        setIsVisible(true); 
    }

    //Actions to close the portal 
    const closePortal = (event)=>{
        event.preventDefault(); 
        setIsVisible(false); 
    }

    //Information pass to the Portal Page
    const infoToPortal = {

        data:{
            visibleContent
        }, 
        actions:{
            closePortal
        }

    }; 

    const PortalComponent = ()=>{

        if(!isVisible){
            return <></>
        }

        return <PortalTemplate data={infoToPortal} />
    }; 



    //Data to be exported 
    return {
        data: {
            PortalComponent
        }, 
        actions:{
            showPortal
        }
    }


}

export default usePortalController