/*
This hook is used to put the content into a Portal Template.
## Input: 
- content : 
    * It should be a REACT function which return a JSX element

## States :
- isVisible to constrol whether displaying the portal; 
- visibleContent is the content to display after checking 

*/

/***************Import external Modules****************** */
import React, { useState, useEffect } from 'react';

/***************Import Internal Modules****************** */
import PortalTemplate from '../../../components/portal/portComponent';


const usePortalController = (content) => {

    /* 
        States for the Controller 
        - isVisibile to constrol whether displaying the portal; 
    */
    const [isVisible, setIsVisible] = useState(false);
    const [contentDisplayed, setContentDisplayed] = useState();

    //Update visible content
    useEffect(() => {

        const defaultContent = <>There is no content to display</>;

        if (typeof content === 'function') {

            try {
                const element = React.createElement(content);
                setContentDisplayed(element);
                return;

            } catch (err) {
                //Internal Log
                console.log(
                    `Error in showing Portal Conctent. The content is invalid. 
                        * Input content: ${content}
                        `
                )
                setContentDisplayed(defaultContent);
                return;
            }

        } else {
            setContentDisplayed(defaultContent);
            return;
        }

    }, [content])


    //Actions to show the portal 
    const showPortal = (event) => {
        event.preventDefault();
        setIsVisible(true);
    }

    //Actions to close the portal 
    const closePortal = (event) => {
        event.preventDefault();
        setIsVisible(false);
    }

    //Information pass to the Portal Page
    const infoToPortal = {

        data: {
            contentDisplayed
        },
        actions: {
            closePortal
        }

    };

    const PortalComponent = () => {

        if (!isVisible) {
            return <></>
        }

        return <PortalTemplate data={infoToPortal} />
    };



    //Data to be exported 
    return {
        data: {
            PortalComponent
        },
        actions: {
            showPortal
        }
    }


}

export default usePortalController