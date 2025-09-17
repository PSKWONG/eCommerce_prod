/***************Import external Modules****************** */
import React, {useContext} from 'react'; 


/***************Import Internal Modules****************** */
import './masterPage.css'; 


/*
Masterpage is mainly composed of the following components
- header 
    * menus 
- Content Wrapper 
    * Display of content 
- Mobile Menu 
    * Visible when the size is suitable 
*/


const MasterPageComponent = ()=>{



    return (
        <>
            <div className={'masterHeaderWrapper'}>
                Header Wrapper
            </div>
            <div className={'masterContentWrapper'}>
                Content Wrapper 
            </div>
            <div className={'masterMobileMenuWrapper'}>
                Mobile Menu 
            </div>
        </>
    )

}

export default MasterPageComponent; 