/*
Portal Menu to be imported to the portal template
*/
/***************Import External Modules****************** */
import React, { useContext } from 'react';

/***************Import Internal Modules****************** */
import styles from './portalMenu.module.css';
import { MasterPageContext } from '../../../containers/masterPage/MasterPageContainer';
import MenuItem from '../menuItem/MenuItemComponent';


const PortalMenuComponent = () => {

    //Get the data from container 
    const { data } = useContext(MasterPageContext) ?? {};
    const { floatingNavMenuItems } = data ?? {};

    //Navigation Menu 
    let floatingMenuContent = [];
    floatingMenuContent = (floatingNavMenuItems ?? []).map((item, index) => {
        return <MenuItem key={index} type={'text'} data={item} />
    })



    return (
        <>
            <ul className={styles.menu}>
                {floatingMenuContent}
            </ul>
        </>
    )
}

export default PortalMenuComponent; 