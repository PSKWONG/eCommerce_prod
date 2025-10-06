/***************Import External Modules****************** */
import React from 'react';

/***************Import Internal Modules****************** */
import menuItems from '../../../containers/users/data/menuItems.json';
//import styles from './portalMenu.module.css';
import MenuItemCompnent from '../../../components/masterPage/menuItem/MenuItemComponent';

const UserPortalMenuComponent = () => {

    console.log('Menu Items', menuItems)


    //Navigation Menu 
    let portalMenuContent = [];
    portalMenuContent = (menuItems ?? []).map((item, index) => {
        return <MenuItemCompnent key={`U_menu_${index}`} type={'icon'} data={item} />
    })


    return (
        <>
            {portalMenuContent}
        </>
    )


};

export default UserPortalMenuComponent;

